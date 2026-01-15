"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/rich-text-editor";
import {
  FileText,
  Save,
  X,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Info,
  ScrollText,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import SettingsService from "@/lib/services/settings.service";

export default function EditInfoPagePage() {
  const t = useTranslations("infoPages");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  const isRTL = locale === "ar";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("ar");
  const [formData, setFormData] = useState({
    title_en: "",
    title_ar: "",
    content_en: "",
    content_ar: "",
  });

  // Get page info based on slug
  const pageInfo = {
    "about-us": {
      icon: Info,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    "terms-and-conditions": {
      icon: ScrollText,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  };

  const currentPage = pageInfo[slug] || pageInfo["about-us"];
  const Icon = currentPage.icon;

  // Helper to extract translations
  const extractPageData = (data) => {
    if (!data) return { title_ar: "", title_en: "", content_ar: "", content_en: "" };

    // If API returns translations array
    if (data.translations && Array.isArray(data.translations)) {
      const arTrans = data.translations.find(t => t.locale === "ar") || {};
      const enTrans = data.translations.find(t => t.locale === "en") || {};
      return {
        title_ar: arTrans.title || "",
        title_en: enTrans.title || "",
        content_ar: arTrans.description || arTrans.content || "",
        content_en: enTrans.description || enTrans.content || "",
      };
    }

    // If API returns flat structure
    return {
      title_ar: data.title_ar || "",
      title_en: data.title_en || "",
      content_ar: data.content_ar || "",
      content_en: data.content_en || "",
    };
  };

  // Fetch page data
  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await SettingsService.getInfoPage(slug);
        // API returns { status: "success" } not { success: true }
        if ((response.success || response.status === "success") && response.data) {
          const pageData = extractPageData(response.data);
          setFormData(pageData);
        }
      } catch (error) {
        console.error("Error fetching info page:", error);
        toast.error(t("fetchError") || "Failed to load page");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.title_ar.trim()) {
      toast.error(t("titleArRequired") || "Arabic title is required");
      return false;
    }
    if (!formData.content_ar.trim() || formData.content_ar === "<p><br></p>") {
      toast.error(t("contentArRequired") || "Arabic content is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaving(true);
      // API expects translations format with ar/en objects
      const dataToSend = {
        ar: {
          title: formData.title_ar,
          description: formData.content_ar,
        },
        en: {
          title: formData.title_en || formData.title_ar,
          description: formData.content_en || formData.content_ar,
        },
      };

      const response = await SettingsService.updateInfoPage(slug, dataToSend);

      // API returns { status: "success" } not { success: true }
      if (response.success || response.status === "success") {
        toast.success(t("updateSuccess") || "Page updated successfully");
        router.push(`/${locale}/admin/settings/info-pages`);
      } else {
        toast.error(response.message || t("updateError") || "Failed to update page");
      }
    } catch (error) {
      console.error("Error updating info page:", error);
      toast.error(t("updateError") || "Failed to update page");
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
        <Link
          href={`/${locale}/admin/settings/info-pages`}
          className="hover:text-foreground transition-colors"
        >
          {t("title")}
        </Link>
        <ArrowIcon className="w-4 h-4" />
        <span className="text-foreground font-medium">{t(slug)}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className={`p-2 rounded-lg ${currentPage.bgColor}`}>
            <Icon className={`w-6 h-6 ${currentPage.color}`} />
          </div>
          {t("editPage")}: {t(slug)}
        </h1>
        <p className="text-muted-foreground">{t("editPageDesc")}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              {t("pageContent")}
            </CardTitle>
            {/* Language Tabs */}
            <div className="flex gap-2 mt-4">
              <Button
                type="button"
                variant={activeTab === "ar" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("ar")}
              >
                العربية
              </Button>
              <Button
                type="button"
                variant={activeTab === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("en")}
              >
                English
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Arabic Content */}
            {activeTab === "ar" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title_ar">
                    {t("titleAr")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title_ar"
                    name="title_ar"
                    value={formData.title_ar}
                    onChange={handleInputChange}
                    placeholder={t("titleArPlaceholder") || "Enter title in Arabic"}
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {t("contentAr")} <span className="text-red-500">*</span>
                  </Label>
                  <RichTextEditor
                    value={formData.content_ar}
                    onChange={(value) => handleEditorChange("content_ar", value)}
                    placeholder={t("contentArPlaceholder") || "Enter content in Arabic"}
                    dir="rtl"
                  />
                </div>
              </div>
            )}

            {/* English Content */}
            {activeTab === "en" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title_en">{t("titleEn")}</Label>
                  <Input
                    id="title_en"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleInputChange}
                    placeholder={t("titleEnPlaceholder") || "Enter title in English"}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("contentEn")}</Label>
                  <RichTextEditor
                    value={formData.content_en}
                    onChange={(value) => handleEditorChange("content_en", value)}
                    placeholder={t("contentEnPlaceholder") || "Enter content in English"}
                    dir="ltr"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${locale}/admin/settings/info-pages`)}
          >
            <X className="w-4 h-4 me-2" />
            {tCommon("cancel")}
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin me-2" />
                {t("saving")}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 me-2" />
                {t("savePage")}
              </>
            )}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
