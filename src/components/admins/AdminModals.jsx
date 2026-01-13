"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  VisuallyHidden,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  User, Mail, Phone, Clock, Shield, Key,
  CheckCircle, XCircle, Loader2, Trash2, Upload,
  Eye, EyeOff, RefreshCw, UserCog, Image as ImageIcon,
  ChevronDown, ChevronUp
} from "lucide-react";

// ============================================
// VIEW ADMIN DETAILS MODAL
// ============================================
export function AdminViewModal({
  isOpen,
  onClose,
  admin,
  isLoading,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  const t = useTranslations("admins.modal");
  const tp = useTranslations("admins.permissions_groups");

  const getInitials = (name) => {
    if (!name) return "??";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  // Group permissions by module
  const groupedPermissions = admin?.permissions?.reduce((acc, perm) => {
    const parts = perm.name.split(".");
    const module = parts[0];
    if (!acc[module]) acc[module] = [];
    acc[module].push(perm);
    return acc;
  }, {}) || {};

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0">
        <VisuallyHidden>
          <ModalTitle>{t("viewTitle")}</ModalTitle>
        </VisuallyHidden>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
              <p className="text-slate-500">{t("loading")}</p>
            </div>
          </div>
        ) : admin ? (
          <>
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
              </div>

              <div className="relative flex items-start gap-5">
                {/* Avatar */}
                <div className="relative">
                  {admin.image ? (
                    <img
                      src={admin.image}
                      alt={admin.name}
                      className="h-24 w-24 rounded-2xl object-cover border-4 border-white/30 shadow-xl"
                    />
                  ) : (
                    <div className="h-24 w-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-4 border-white/30 shadow-xl">
                      <span className="text-white font-bold text-3xl">
                        {getInitials(admin.name)}
                      </span>
                    </div>
                  )}
                  <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-3 border-white flex items-center justify-center ${admin.status ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                    {admin.status ? (
                      <CheckCircle className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                </div>

                {/* Admin Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{admin.name}</h2>
                    <Badge className={`${admin.status ? 'bg-emerald-500/20 text-emerald-100 border-emerald-400/30' : 'bg-rose-500/20 text-rose-100 border-rose-400/30'}`}>
                      {admin.status ? t("active") : t("inactive")}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      <span>{admin.email}</span>
                    </div>
                    {admin.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-4 w-4" />
                        <span dir="ltr">{admin.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-6 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{admin.permissions?.length || 0}</div>
                      <div className="text-xs text-white/70">{t("permissionsInfo")}</div>
                    </div>
                    <div className="w-px h-8 bg-white/20" />
                    <div className="text-center">
                      <div className="text-sm font-medium">{admin.created_at}</div>
                      <div className="text-xs text-white/70">{t("registrationDate")}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/10 hover:bg-white/20 text-white border-0 gap-2"
                    onClick={() => onEdit?.(admin)}
                  >
                    <UserCog className="h-4 w-4" />
                    {t("edit")}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className={`border-0 gap-2 ${admin.status ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-100' : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-100'}`}
                    onClick={() => onToggleStatus?.(admin.id)}
                  >
                    {admin.status ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    {admin.status ? t("deactivate") : t("activate")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[400px]">
              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  {t("personalInfo")}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <InfoCard icon={User} label={t("fullName")} value={admin.name} />
                  <InfoCard icon={Mail} label={t("email")} value={admin.email} />
                  <InfoCard icon={Phone} label={t("phone")} value={admin.phone || "-"} dir="ltr" />
                  <InfoCard icon={Clock} label={t("lastActivity")} value={admin.updated_at} />
                </div>
              </div>

              <Separator className="my-6" />

              {/* Permissions */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  {t("permissionsInfo")} ({admin.permissions?.length || 0})
                </h3>
                <div className="space-y-3">
                  {Object.entries(groupedPermissions).map(([module, perms]) => (
                    <div key={module} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="font-medium text-slate-800 mb-2 text-sm">
                        {tp(module) || module}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {perms.map((perm) => {
                          const action = perm.name.split(".").pop();
                          return (
                            <Badge key={perm.id} variant="secondary" className="text-xs bg-white border-slate-200">
                              {action === "special" ? t("special") : t(action === "view" ? "view" : action === "create" ? "create" : action === "edit" ? "editPerm" : "deletePerm")}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 px-6 py-4 bg-slate-50/50 flex items-center justify-between">
              <Button
                variant="outline"
                className="text-rose-600 border-rose-200 hover:bg-rose-50 gap-2"
                onClick={() => onDelete?.(admin.id)}
              >
                <Trash2 className="h-4 w-4" />
                {t("delete")}
              </Button>
              <Button variant="outline" onClick={onClose}>
                {t("close")}
              </Button>
            </div>
          </>
        ) : null}
      </ModalContent>
    </Modal>
  );
}

// ============================================
// ADD/EDIT ADMIN MODAL
// ============================================
export function AdminFormModal({
  isOpen,
  onClose,
  mode = "add",
  initialData = null,
  permissions = {},
  specialPermissions = [],
  onSubmit,
  isSubmitting = false,
}) {
  const t = useTranslations("admins.modal");
  const tp = useTranslations("admins.permissions_groups");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    is_active: 1,
    selectedPermissions: [],
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});

  const isEdit = mode === "edit";

  // Initialize form data
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name || "",
          email: initialData.email || "",
          phone: initialData.phone || "",
          password: "",
          password_confirmation: "",
          is_active: initialData.status ? 1 : 0,
          selectedPermissions: initialData.permissions?.map(p => p.name) || [],
        });
        setImagePreview(initialData.image);
      } else {
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          password_confirmation: "",
          is_active: 1,
          selectedPermissions: [],
        });
        setImagePreview(null);
      }
      setImageFile(null);
      setErrors({});
    }
  }, [isOpen, initialData]);

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

  const togglePermission = (permName) => {
    setFormData((prev) => ({
      ...prev,
      selectedPermissions: prev.selectedPermissions.includes(permName)
        ? prev.selectedPermissions.filter((p) => p !== permName)
        : [...prev.selectedPermissions, permName],
    }));
  };

  const toggleModule = (module) => {
    setExpandedModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const selectAllInModule = (module, perms) => {
    const permNames = Object.keys(perms).map((key) => {
      const isSpecial = specialPermissions.includes(key);
      return isSpecial ? `${module}.${key}.special` : null;
    }).filter(Boolean);

    // For non-special permissions, add all CRUD actions
    Object.keys(perms).forEach((key) => {
      if (!specialPermissions.includes(key)) {
        ["view", "create", "edit", "delete"].forEach((action) => {
          permNames.push(`${module}.${key}.${action}`);
        });
      }
    });

    const allSelected = permNames.every((p) => formData.selectedPermissions.includes(p));

    if (allSelected) {
      setFormData((prev) => ({
        ...prev,
        selectedPermissions: prev.selectedPermissions.filter((p) => !permNames.includes(p)),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedPermissions: [...new Set([...prev.selectedPermissions, ...permNames])],
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t("nameRequired");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("invalidEmail");
    }
    if (!isEdit && !formData.password) {
      newErrors.password = t("passwordRequired");
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = t("passwordMin");
    }
    if (formData.password && formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = t("passwordMismatch");
    }
    if (formData.selectedPermissions.length === 0) {
      newErrors.permissions = t("permissionsRequired");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      if (formData.phone) submitData.append("phone", formData.phone);
      submitData.append("is_active", formData.is_active);

      if (formData.password) {
        submitData.append("password", formData.password);
        submitData.append("password_confirmation", formData.password_confirmation);
      }

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      formData.selectedPermissions.forEach((perm) => {
        submitData.append("permission_id[]", perm);
      });

      onSubmit?.(submitData);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <ModalHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${isEdit ? 'bg-amber-100' : 'bg-primary/10'}`}>
              {isEdit ? (
                <UserCog className="h-6 w-6 text-amber-600" />
              ) : (
                <User className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <ModalTitle className="text-xl">
                {isEdit ? t("editTitle") : t("addTitle")}
              </ModalTitle>
              <ModalDescription>
                {isEdit ? t("editSubtitle") : t("addSubtitle")}
              </ModalDescription>
            </div>
          </div>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <User className="h-4 w-4 text-primary" />
                {t("personalInfo")}
              </div>

              {/* Image Upload */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-20 w-20 rounded-xl object-cover border-2 border-slate-200" />
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
                      <span className="text-sm">{imagePreview ? t("changeImage") : t("uploadImage")}</span>
                    </div>
                  </Label>
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-slate-700 mb-2 block">
                    {t("fullName")} <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`h-11 ${errors.name ? 'border-rose-500' : ''}`}
                  />
                  {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-slate-700 mb-2 block">
                    {t("email")} <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`h-11 ${errors.email ? 'border-rose-500' : ''}`}
                    dir="ltr"
                  />
                  {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-slate-700 mb-2 block">
                    {t("phone")}
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="h-11"
                    dir="ltr"
                  />
                </div>

                {/* Status */}
                <div>
                  <Label className="text-slate-700 mb-2 block">{t("active")}</Label>
                  <div className="flex items-center gap-3 h-11">
                    <Switch
                      checked={formData.is_active === 1}
                      onCheckedChange={(checked) => handleChange("is_active", checked ? 1 : 0)}
                    />
                    <span className="text-sm text-slate-600">
                      {formData.is_active === 1 ? t("active") : t("inactive")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Password Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Key className="h-4 w-4 text-primary" />
                {t("password")}
                {isEdit && <span className="text-xs text-slate-400">({t("passwordHint")})</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <Label htmlFor="password" className="text-slate-700 mb-2 block">
                    {t("password")} {!isEdit && <span className="text-rose-500">*</span>}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className={`h-11 pe-10 ${errors.password ? 'border-rose-500' : ''}`}
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="password_confirmation" className="text-slate-700 mb-2 block">
                    {t("confirmPassword")} {!isEdit && <span className="text-rose-500">*</span>}
                  </Label>
                  <Input
                    id="password_confirmation"
                    type={showPassword ? "text" : "password"}
                    value={formData.password_confirmation}
                    onChange={(e) => handleChange("password_confirmation", e.target.value)}
                    className={`h-11 ${errors.password_confirmation ? 'border-rose-500' : ''}`}
                    dir="ltr"
                  />
                  {errors.password_confirmation && <p className="text-rose-500 text-xs mt-1">{errors.password_confirmation}</p>}
                </div>
              </div>
            </div>

            <Separator />

            {/* Permissions Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Shield className="h-4 w-4 text-primary" />
                  {t("permissionsInfo")} <span className="text-rose-500">*</span>
                </div>
                <span className="text-xs text-slate-500">
                  {formData.selectedPermissions.length} {t("permissionsInfo")}
                </span>
              </div>
              {errors.permissions && <p className="text-rose-500 text-xs">{errors.permissions}</p>}

              <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-lg p-3">
                {Object.entries(permissions).map(([module, perms]) => (
                  <div key={module} className="border rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleModule(module)}
                      className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{tp(module) || module}</span>
                        <Badge variant="secondary" className="text-xs">
                          {Object.keys(perms).length}
                        </Badge>
                      </div>
                      {expandedModules[module] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    {expandedModules[module] && (
                      <div className="p-3 space-y-3 bg-white">
                        <button
                          type="button"
                          onClick={() => selectAllInModule(module, perms)}
                          className="text-xs text-primary hover:underline"
                        >
                          {t("selectAll")}
                        </button>

                        {Object.entries(perms).map(([key, label]) => {
                          const isSpecial = specialPermissions.includes(key);
                          const permBase = `${module}.${key}`;

                          if (isSpecial) {
                            const permName = `${permBase}.special`;
                            return (
                              <div key={key} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={permName}
                                  checked={formData.selectedPermissions.includes(permName)}
                                  onChange={() => togglePermission(permName)}
                                  className="rounded border-slate-300"
                                />
                                <label htmlFor={permName} className="text-sm text-slate-700 cursor-pointer">
                                  {key} ({t("special")})
                                </label>
                              </div>
                            );
                          }

                          return (
                            <div key={key} className="space-y-2">
                              <div className="text-sm text-slate-600 font-medium">{key}</div>
                              <div className="flex flex-wrap gap-3 ps-4">
                                {["view", "create", "edit", "delete"].map((action) => {
                                  const permName = `${permBase}.${action}`;
                                  return (
                                    <div key={action} className="flex items-center gap-1.5">
                                      <input
                                        type="checkbox"
                                        id={permName}
                                        checked={formData.selectedPermissions.includes(permName)}
                                        onChange={() => togglePermission(permName)}
                                        className="rounded border-slate-300"
                                      />
                                      <label htmlFor={permName} className="text-xs text-slate-600 cursor-pointer">
                                        {t(action === "view" ? "view" : action === "create" ? "create" : action === "edit" ? "editPerm" : "deletePerm")}
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <ModalFooter className="border-t border-slate-200 px-6 py-4 bg-slate-50/50">
            <Button type="button" variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[120px] gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("saving")}
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  {isEdit ? t("saveChanges") : t("save")}
                </>
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

// ============================================
// DELETE CONFIRMATION MODAL
// ============================================
export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  adminName,
  isDeleting = false,
}) {
  const t = useTranslations("admins.modal");

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-md">
        <VisuallyHidden>
          <ModalTitle>{t("deleteTitle")}</ModalTitle>
        </VisuallyHidden>
        <div className="p-6 text-center">
          <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="h-8 w-8 text-rose-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t("deleteTitle")}</h3>
          <p className="text-slate-500 mb-6">
            {t("deleteConfirm")} <span className="font-semibold text-slate-700">{adminName}</span>?
            <br />
            <span className="text-sm text-rose-500">{t("deleteWarning")}</span>
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onClose} className="min-w-[100px]">
              {t("cancel")}
            </Button>
            <Button variant="destructive" onClick={onConfirm} disabled={isDeleting} className="min-w-[100px] gap-2">
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("deleting")}
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  {t("delete")}
                </>
              )}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

// ============================================
// RESTORE CONFIRMATION MODAL
// ============================================
export function RestoreConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  adminName,
  isRestoring = false,
}) {
  const t = useTranslations("admins.modal");

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-md">
        <VisuallyHidden>
          <ModalTitle>{t("restoreTitle")}</ModalTitle>
        </VisuallyHidden>
        <div className="p-6 text-center">
          <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t("restoreTitle")}</h3>
          <p className="text-slate-500 mb-6">
            {t("restoreConfirm")} <span className="font-semibold text-slate-700">{adminName}</span>?
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onClose} className="min-w-[100px]">
              {t("cancel")}
            </Button>
            <Button onClick={onConfirm} disabled={isRestoring} className="min-w-[100px] gap-2 bg-emerald-600 hover:bg-emerald-700">
              {isRestoring ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("restoring")}
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  {t("activate")}
                </>
              )}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

// ============================================
// HELPER COMPONENTS
// ============================================
function InfoCard({ icon: Icon, label, value, dir }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
      <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
        <Icon className="h-4 w-4 text-slate-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-slate-900 truncate" dir={dir}>
          {value}
        </p>
      </div>
    </div>
  );
}
