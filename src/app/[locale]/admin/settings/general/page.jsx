"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Settings,
  Save,
  Upload,
  Phone,
  MessageCircle,
  Percent,
  Image as ImageIcon,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Edit,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import SettingsService from "@/lib/services/settings.service";
import Link from "next/link";

export default function GeneralSettingsPage() {
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [originalLogo, setOriginalLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    phone: "",
    whatsapp: "",
    fee_percent: "",
  });

  const [originalData, setOriginalData] = useState({
    phone: "",
    whatsapp: "",
    fee_percent: "",
  });

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await SettingsService.getSettings();
      // API returns { status: "success", data: {...} } not { success: true, data: {...} }
      if ((response.success || response.status === "success") && response.data) {
        const data = response.data;
        const newData = {
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          fee_percent: data.fee_percent || "",
        };
        setFormData(newData);
        setOriginalData(newData);
        if (data.logo) {
          setLogoPreview(data.logo);
          setOriginalLogo(data.logo);
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error(t("fetchError") || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)) {
        toast.error(t("invalidFileType") || "Please upload PNG, JPG, or WEBP image");
        return;
      }
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error(t("fileTooLarge") || "File size must be less than 2MB");
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(originalData);
    setLogoPreview(originalLogo);
    setLogoFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const dataToSend = {
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        fee_percent: parseFloat(formData.fee_percent) || 0,
      };

      if (logoFile) {
        dataToSend.logo = logoFile;
      }

      const response = await SettingsService.updateSettings(dataToSend);

      if (response.success || response.status === "success") {
        toast.success(t("saveSuccess") || "Settings saved successfully");
        setOriginalData(formData);
        setOriginalLogo(logoPreview);
        setLogoFile(null);
        setIsEditing(false);
      } else {
        toast.error(response.message || t("saveError") || "Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error(t("saveError") || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  if (loading) {
    return (
      <DashboardLayout requiredUserType="admin">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout requiredUserType="admin">
      <Toaster position="top-center" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href={`/${locale}/admin/users`} className="hover:text-foreground transition-colors">
          {tCommon("home") || "Home"}
        </Link>
        <ArrowIcon className="w-4 h-4" />
        <span className="text-foreground font-medium">{t("generalSettings")}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            {t("generalSettings")}
          </h1>
          <p className="text-muted-foreground">{t("generalSettingsDesc")}</p>
        </div>
        {!isEditing && (
          <Button onClick={handleEdit} className="gap-2">
            <Edit className="w-4 h-4" />
            {tCommon("edit")}
          </Button>
        )}
      </div>

      {isEditing ? (
        /* Edit Mode */
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Logo Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  {t("logo")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-40 h-40 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all overflow-hidden"
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo"
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">{t("uploadLogo")}</span>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    {t("logoHint") || "PNG, JPG, WEBP - Max 2MB"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  {t("contactInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {t("phone")}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+974 1234 5678"
                    dir="ltr"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    {t("whatsapp")}
                  </Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="+974 1234 5678"
                    dir="ltr"
                  />
                </div>

                {/* Fee Percent */}
                <div className="space-y-2">
                  <Label htmlFor="fee_percent" className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-muted-foreground" />
                    {t("feePercent")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="fee_percent"
                      name="fee_percent"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.fee_percent}
                      onChange={handleInputChange}
                      placeholder="10"
                      className="pe-10"
                      dir="ltr"
                    />
                    <span className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("feePercentHint") || "Platform fee percentage for bookings"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={saving}>
              <X className="w-4 h-4 me-2" />
              {tCommon("cancel")}
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin me-2" />
                  {t("saving") || "Saving..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 me-2" />
                  {t("saveSettings")}
                </>
              )}
            </Button>
          </div>
        </form>
      ) : (
        /* View Mode */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Logo Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                {t("logo")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="w-40 h-40 border-2 border-border rounded-xl flex flex-col items-center justify-center overflow-hidden bg-muted/30">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <>
                      <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        {t("noLogo") || "No logo uploaded"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                {t("contactInfo")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Phone */}
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{t("phone")}</span>
                </div>
                <span className="text-sm font-mono" dir="ltr">
                  {formData.phone || "-"}
                </span>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{t("whatsapp")}</span>
                </div>
                <span className="text-sm font-mono" dir="ltr">
                  {formData.whatsapp || "-"}
                </span>
              </div>

              {/* Fee Percent */}
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Percent className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{t("feePercent")}</span>
                </div>
                <span className="text-sm font-mono">
                  {formData.fee_percent ? `${formData.fee_percent}%` : "-"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
