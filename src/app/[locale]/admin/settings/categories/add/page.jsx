"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  X,
  Upload,
  ImageIcon,
  Loader2,
  FolderTree,
} from "lucide-react";
import CategoriesService from "@/lib/services/categories.service";
import toast from "react-hot-toast";

export default function AddCategoryPage() {
  const t = useTranslations("categories");
  const tc = useTranslations("common");
  const router = useRouter();
  const { locale } = useParams();
  const fileInputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    ar_name: "",
    en_name: "",
    sort: 1,
    is_active: true,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState("ar");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(t("invalidImageType"));
        return;
      }
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error(t("imageTooLarge"));
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.ar_name.trim()) {
      newErrors.ar_name = t("arNameRequired");
    }
    if (!formData.en_name.trim()) {
      newErrors.en_name = t("enNameRequired");
    }
    if (!formData.image) {
      newErrors.image = t("imageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Switch to tab with error
      if (errors.ar_name) setActiveTab("ar");
      else if (errors.en_name) setActiveTab("en");
      toast.error(t("pleaseFixErrors"));
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await CategoriesService.createCategory(formData);

      if (result.success) {
        toast.success(result.message);
        router.push(`/${locale}/admin/settings/categories`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Create category error:", error);
      toast.error(t("createError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push(`/${locale}/admin/settings/categories`);
  };

  const BackIcon = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <DashboardLayout requiredUserType="admin">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="h-10 w-10 rounded-xl"
        >
          <BackIcon className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("addCategory")}</h1>
          <p className="text-slate-500 mt-1">{t("addCategoryDesc")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image Upload */}
          <div className="lg:col-span-1">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  {t("categoryImage")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Image Preview */}
                  <div
                    className={`relative aspect-square rounded-xl border-2 border-dashed transition-colors ${
                      errors.image
                        ? "border-rose-300 bg-rose-50"
                        : "border-slate-200 bg-slate-50 hover:border-primary hover:bg-primary/5"
                    } flex items-center justify-center overflow-hidden cursor-pointer`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage();
                          }}
                          className="absolute top-2 end-2 h-8 w-8 bg-rose-500 hover:bg-rose-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-6">
                        <div className="h-16 w-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Upload className="h-8 w-8 text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-700 mb-1">
                          {t("uploadImage")}
                        </p>
                        <p className="text-xs text-slate-500">{t("imageHint")}</p>
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {errors.image && (
                    <p className="text-sm text-rose-500">{errors.image}</p>
                  )}

                  <p className="text-xs text-slate-500 text-center">
                    {t("supportedFormats")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FolderTree className="h-5 w-5 text-primary" />
                  {t("categoryInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language Tabs */}
                <div className="border-b border-slate-200">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab("ar")}
                      className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "ar"
                          ? "border-primary text-primary"
                          : "border-transparent text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      العربية
                      {errors.ar_name && (
                        <span className="ms-2 h-2 w-2 bg-rose-500 rounded-full inline-block"></span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("en")}
                      className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "en"
                          ? "border-primary text-primary"
                          : "border-transparent text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      English
                      {errors.en_name && (
                        <span className="ms-2 h-2 w-2 bg-rose-500 rounded-full inline-block"></span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Name */}
                {activeTab === "ar" && (
                  <div className="space-y-2">
                    <Label htmlFor="ar_name">
                      {t("categoryName")} <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="ar_name"
                      value={formData.ar_name}
                      onChange={(e) => handleChange("ar_name", e.target.value)}
                      placeholder={t("arNamePlaceholder")}
                      className={errors.ar_name ? "border-rose-300" : ""}
                      dir="rtl"
                    />
                    {errors.ar_name && (
                      <p className="text-sm text-rose-500">{errors.ar_name}</p>
                    )}
                  </div>
                )}

                {/* English Name */}
                {activeTab === "en" && (
                  <div className="space-y-2">
                    <Label htmlFor="en_name">
                      {t("categoryName")} <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="en_name"
                      value={formData.en_name}
                      onChange={(e) => handleChange("en_name", e.target.value)}
                      placeholder={t("enNamePlaceholder")}
                      className={errors.en_name ? "border-rose-300" : ""}
                      dir="ltr"
                    />
                    {errors.en_name && (
                      <p className="text-sm text-rose-500">{errors.en_name}</p>
                    )}
                  </div>
                )}

                {/* Sort Order */}
                <div className="space-y-2">
                  <Label htmlFor="sort">{t("sortOrder")}</Label>
                  <Input
                    id="sort"
                    type="number"
                    min="1"
                    value={formData.sort}
                    onChange={(e) => handleChange("sort", parseInt(e.target.value) || 1)}
                    className="w-32"
                  />
                  <p className="text-xs text-slate-500">{t("sortHint")}</p>
                </div>

                {/* Status Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <Label className="text-base font-medium">{t("status")}</Label>
                    <p className="text-sm text-slate-500 mt-1">
                      {formData.is_active ? t("activeDesc") : t("inactiveDesc")}
                    </p>
                  </div>
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => handleChange("is_active", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleCancel} className="gap-2">
                <X className="h-4 w-4" />
                {tc("cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {t("saveCategory")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
