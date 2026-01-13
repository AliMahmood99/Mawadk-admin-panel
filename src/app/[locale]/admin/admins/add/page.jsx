"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, User, Mail, Phone, Key, Shield, Upload,
  Eye, EyeOff, Loader2, CheckCircle, Save, Image as ImageIcon,
  Check, X
} from "lucide-react";
import AdminsService from "@/lib/services/admins.service";
import toast from "react-hot-toast";

export default function AddAdminPage() {
  const t = useTranslations("admins");
  const tp = useTranslations("admins.permissions_groups");
  const router = useRouter();
  const { locale } = useParams();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    is_active: 1,
  });
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(true);

  // Permissions data
  const [permissions, setPermissions] = useState({});
  const [specialPermissions, setSpecialPermissions] = useState([]);

  // Fetch permissions on mount
  useEffect(() => {
    const fetchPermissions = async () => {
      setIsLoadingPermissions(true);
      try {
        const result = await AdminsService.getAllPermissions();
        if (result.success) {
          setPermissions(result.data.permissions || {});
          setSpecialPermissions(result.data.special || []);
        } else {
          toast.error(t("fetchError"));
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
        toast.error(t("fetchError"));
      } finally {
        setIsLoadingPermissions(false);
      }
    };
    fetchPermissions();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Permission helpers
  const togglePermission = (permName) => {
    setSelectedPermissions((prev) =>
      prev.includes(permName)
        ? prev.filter((p) => p !== permName)
        : [...prev, permName]
    );
  };

  const isPermissionSelected = (permName) => selectedPermissions.includes(permName);

  const getModulePermissions = (module, perms) => {
    const permList = [];
    Object.keys(perms).forEach((key) => {
      const isSpecial = specialPermissions.includes(key);
      if (isSpecial) {
        permList.push({ name: `${module}.${key}.special`, action: "special", label: key });
      } else {
        ["view", "create", "edit", "delete"].forEach((action) => {
          permList.push({ name: `${module}.${key}.${action}`, action, label: key });
        });
      }
    });
    return permList;
  };

  const selectAllInModule = (module, perms) => {
    const modulePerms = getModulePermissions(module, perms).map((p) => p.name);
    const allSelected = modulePerms.every((p) => selectedPermissions.includes(p));

    if (allSelected) {
      setSelectedPermissions((prev) => prev.filter((p) => !modulePerms.includes(p)));
    } else {
      setSelectedPermissions((prev) => [...new Set([...prev, ...modulePerms])]);
    }
  };

  const isModuleFullySelected = (module, perms) => {
    const modulePerms = getModulePermissions(module, perms).map((p) => p.name);
    return modulePerms.every((p) => selectedPermissions.includes(p));
  };

  const isModulePartiallySelected = (module, perms) => {
    const modulePerms = getModulePermissions(module, perms).map((p) => p.name);
    const selected = modulePerms.filter((p) => selectedPermissions.includes(p));
    return selected.length > 0 && selected.length < modulePerms.length;
  };

  const selectAll = () => {
    const allPerms = [];
    Object.entries(permissions).forEach(([module, perms]) => {
      getModulePermissions(module, perms).forEach((p) => allPerms.push(p.name));
    });
    setSelectedPermissions(allPerms);
  };

  const deselectAll = () => {
    setSelectedPermissions([]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t("modal.nameRequired");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("modal.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("modal.invalidEmail");
    }
    if (!formData.password) {
      newErrors.password = t("modal.passwordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = t("modal.passwordMin");
    }
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = t("modal.passwordMismatch");
    }
    if (selectedPermissions.length === 0) {
      newErrors.permissions = t("modal.permissionsRequired");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      if (formData.phone) submitData.append("phone", formData.phone);
      submitData.append("is_active", formData.is_active);
      submitData.append("password", formData.password);
      submitData.append("password_confirmation", formData.password_confirmation);

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      selectedPermissions.forEach((perm) => {
        submitData.append("permission_id[]", perm);
      });

      const result = await AdminsService.createAdmin(submitData);

      if (result.success) {
        toast.success(result.message || t("addSuccess"));
        router.push(`/${locale}/admin/admins`);
      } else {
        toast.error(result.message || t("addError"));
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(t("addError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const actionLabels = {
    view: t("modal.view"),
    create: t("modal.create"),
    edit: t("modal.editPerm"),
    delete: t("modal.deletePerm"),
    special: t("modal.special"),
  };

  const actionColors = {
    view: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
    create: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200",
    edit: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200",
    delete: "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200",
    special: "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
  };

  return (
    <DashboardLayout requiredUserType="admin">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/${locale}/admin/admins`)}
            className="h-10 w-10"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t("modal.addTitle")}</h1>
            <p className="text-slate-500 mt-1">{t("modal.addSubtitle")}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{t("modal.personalInfo")}</CardTitle>
                    <CardDescription>{t("addPersonalDesc")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Image Upload */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-20 w-20 rounded-xl object-cover border-2 border-slate-200"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-xl bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                        <ImageIcon className="h-8 w-8 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="image" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm">
                          {imagePreview ? t("modal.changeImage") : t("modal.uploadImage")}
                        </span>
                      </div>
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <p className="text-xs text-slate-500 mt-1">{t("imageHint")}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-slate-700 mb-2 block">
                      {t("modal.fullName")} <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder={t("namePlaceholder")}
                      className={`h-11 ${errors.name ? "border-rose-500" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-rose-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-slate-700 mb-2 block">
                      {t("modal.email")} <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      className={`h-11 ${errors.email ? "border-rose-500" : ""}`}
                      dir="ltr"
                    />
                    {errors.email && (
                      <p className="text-rose-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-slate-700 mb-2 block">
                      {t("modal.phone")}
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder={t("phonePlaceholder")}
                      className="h-11"
                      dir="ltr"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <Label className="text-slate-700 mb-2 block">{t("status")}</Label>
                    <div className="flex items-center gap-3 h-11 px-3 border rounded-lg bg-slate-50">
                      <Switch
                        checked={formData.is_active === 1}
                        onCheckedChange={(checked) =>
                          handleChange("is_active", checked ? 1 : 0)
                        }
                      />
                      <span className="text-sm text-slate-600">
                        {formData.is_active === 1 ? t("active") : t("inactive")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Password */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Key className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{t("modal.password")}</CardTitle>
                    <CardDescription>{t("passwordDesc")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="text-slate-700 mb-2 block">
                      {t("modal.password")} <span className="text-rose-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        placeholder="••••••••"
                        className={`h-11 pe-10 ${errors.password ? "border-rose-500" : ""}`}
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-rose-500 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label
                      htmlFor="password_confirmation"
                      className="text-slate-700 mb-2 block"
                    >
                      {t("modal.confirmPassword")} <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="password_confirmation"
                      type={showPassword ? "text" : "password"}
                      value={formData.password_confirmation}
                      onChange={(e) =>
                        handleChange("password_confirmation", e.target.value)
                      }
                      placeholder="••••••••"
                      className={`h-11 ${
                        errors.password_confirmation ? "border-rose-500" : ""
                      }`}
                      dir="ltr"
                    />
                    {errors.password_confirmation && (
                      <p className="text-rose-500 text-xs mt-1">
                        {errors.password_confirmation}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {t("modal.permissionsInfo")} <span className="text-rose-500">*</span>
                      </CardTitle>
                      <CardDescription>{t("permissionsDesc")}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                      {selectedPermissions.length} {t("modal.selected")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {errors.permissions && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                    <p className="text-rose-600 text-sm flex items-center gap-2">
                      <X className="h-4 w-4" />
                      {errors.permissions}
                    </p>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={selectAll}
                    className="gap-1"
                  >
                    <Check className="h-3 w-3" />
                    {t("selectAll")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={deselectAll}
                    className="gap-1"
                  >
                    <X className="h-3 w-3" />
                    {t("deselectAll")}
                  </Button>
                </div>

                {isLoadingPermissions ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(permissions).map(([module, perms]) => (
                      <div
                        key={module}
                        className="border rounded-xl overflow-hidden bg-white"
                      >
                        {/* Module Header */}
                        <div
                          className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                            isModuleFullySelected(module, perms)
                              ? "bg-primary/5 border-b border-primary/20"
                              : isModulePartiallySelected(module, perms)
                              ? "bg-amber-50 border-b border-amber-200"
                              : "bg-slate-50 border-b border-slate-100"
                          }`}
                          onClick={() => selectAllInModule(module, perms)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                                isModuleFullySelected(module, perms)
                                  ? "bg-primary border-primary"
                                  : isModulePartiallySelected(module, perms)
                                  ? "bg-amber-500 border-amber-500"
                                  : "border-slate-300"
                              }`}
                            >
                              {(isModuleFullySelected(module, perms) ||
                                isModulePartiallySelected(module, perms)) && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <span className="font-semibold text-slate-800">
                              {tp(module) || module}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {Object.keys(perms).length}
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-500">
                            {t("clickToSelectAll")}
                          </span>
                        </div>

                        {/* Permissions Grid */}
                        <div className="p-4">
                          <div className="space-y-3">
                            {Object.entries(perms).map(([key, label]) => {
                              const isSpecial = specialPermissions.includes(key);

                              if (isSpecial) {
                                const permName = `${module}.${key}.special`;
                                return (
                                  <div
                                    key={key}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => togglePermission(permName)}
                                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                                        isPermissionSelected(permName)
                                          ? actionColors.special
                                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                                      }`}
                                    >
                                      {isPermissionSelected(permName) && (
                                        <Check className="h-3 w-3 inline-block me-1" />
                                      )}
                                      {key}
                                    </button>
                                  </div>
                                );
                              }

                              return (
                                <div
                                  key={key}
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50"
                                >
                                  <span className="text-sm font-medium text-slate-700 min-w-[100px]">
                                    {key}
                                  </span>
                                  <div className="flex flex-wrap gap-2">
                                    {["view", "create", "edit", "delete"].map(
                                      (action) => {
                                        const permName = `${module}.${key}.${action}`;
                                        const isSelected =
                                          isPermissionSelected(permName);
                                        return (
                                          <button
                                            key={action}
                                            type="button"
                                            onClick={() => togglePermission(permName)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                              isSelected
                                                ? actionColors[action]
                                                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                                            }`}
                                          >
                                            {isSelected && (
                                              <Check className="h-3 w-3 inline-block me-1" />
                                            )}
                                            {actionLabels[action]}
                                          </button>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">{t("summary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Admin Preview */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-slate-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-slate-900">
                      {formData.name || t("noName")}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formData.email || t("noEmail")}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{t("status")}</span>
                  <Badge
                    className={
                      formData.is_active === 1
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }
                  >
                    {formData.is_active === 1 ? t("active") : t("inactive")}
                  </Badge>
                </div>

                {/* Permissions Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    {t("permissions")}
                  </span>
                  <Badge variant="secondary">
                    {selectedPermissions.length} {t("permissionsLabel")}
                  </Badge>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("modal.saving")}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {t("modal.save")}
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push(`/${locale}/admin/admins`)}
                  >
                    {t("modal.cancel")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
