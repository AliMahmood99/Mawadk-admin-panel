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
import { Switch } from "@/components/ui/switch";
import RichTextEditor from "@/components/ui/rich-text-editor";
import {
  HelpCircle,
  Save,
  X,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Hash,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import SettingsService from "@/lib/services/settings.service";

export default function EditFaqPage() {
  const t = useTranslations("faqs");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const faqId = params.id;
  const isRTL = locale === "ar";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("ar");
  const [formData, setFormData] = useState({
    question_en: "",
    question_ar: "",
    answer_en: "",
    answer_ar: "",
    order: 1,
    is_active: true,
  });

  // Helper to extract translations
  const extractFaqData = (data) => {
    if (!data) return null;

    // If API returns translations array
    if (data.translations && Array.isArray(data.translations)) {
      const arTrans = data.translations.find(t => t.locale === "ar") || {};
      const enTrans = data.translations.find(t => t.locale === "en") || {};
      return {
        question_ar: arTrans.title || arTrans.question || "",
        question_en: enTrans.title || enTrans.question || "",
        answer_ar: arTrans.description || arTrans.answer || "",
        answer_en: enTrans.description || enTrans.answer || "",
        order: data.sort || data.order || 1,
        is_active: data.is_active !== undefined ? data.is_active : true,
      };
    }

    // If API returns flat structure
    return {
      question_ar: data.title || data.question_ar || "",
      question_en: data.title_en || data.question_en || data.title || "",
      answer_ar: data.description || data.answer_ar || "",
      answer_en: data.description_en || data.answer_en || "",
      order: data.sort || data.order || 1,
      is_active: data.is_active !== undefined ? data.is_active : true,
    };
  };

  // Fetch FAQ data
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        setLoading(true);
        const response = await SettingsService.getFaqById(faqId);
        // API returns { status: "success" } not { success: true }
        if ((response.success || response.status === "success") && response.data) {
          const faqData = extractFaqData(response.data);
          if (faqData) {
            setFormData({
              question_en: faqData.question_en,
              question_ar: faqData.question_ar,
              answer_en: faqData.answer_en,
              answer_ar: faqData.answer_ar,
              order: faqData.order,
              is_active: faqData.is_active === 1 || faqData.is_active === true,
            });
          } else {
            toast.error(t("faqNotFound") || "FAQ not found");
            router.push(`/${locale}/admin/settings/faqs`);
          }
        } else {
          toast.error(t("faqNotFound") || "FAQ not found");
          router.push(`/${locale}/admin/settings/faqs`);
        }
      } catch (error) {
        console.error("Error fetching FAQ:", error);
        toast.error(t("fetchError") || "Failed to load FAQ");
        router.push(`/${locale}/admin/settings/faqs`);
      } finally {
        setLoading(false);
      }
    };

    if (faqId) {
      fetchFaq();
    }
  }, [faqId, locale, router, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      is_active: checked,
    }));
  };

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.question_ar.trim()) {
      toast.error(t("questionArRequired") || "Arabic question is required");
      return false;
    }
    if (!formData.answer_ar.trim() || formData.answer_ar === "<p><br></p>") {
      toast.error(t("answerArRequired") || "Arabic answer is required");
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
          title: formData.question_ar,
          description: formData.answer_ar,
        },
        en: {
          title: formData.question_en || formData.question_ar,
          description: formData.answer_en || formData.answer_ar,
        },
        sort: parseInt(formData.order) || 1,
        is_active: formData.is_active ? 1 : 0,
      };

      const response = await SettingsService.updateFaq(faqId, dataToSend);

      // API returns { status: "success" } not { success: true }
      if (response.success || response.status === "success") {
        toast.success(t("updateSuccess") || "FAQ updated successfully");
        router.push(`/${locale}/admin/settings/faqs`);
      } else {
        toast.error(response.message || t("updateError") || "Failed to update FAQ");
      }
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error(t("updateError") || "Failed to update FAQ");
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
          href={`/${locale}/admin/settings/faqs`}
          className="hover:text-foreground transition-colors"
        >
          {t("title")}
        </Link>
        <ArrowIcon className="w-4 h-4" />
        <span className="text-foreground font-medium">{t("editFaq")}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          {t("editFaq")}
        </h1>
        <p className="text-muted-foreground">{t("editFaqDesc")}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Question & Answer */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  {t("faqInfo")}
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
                      <Label htmlFor="question_ar">
                        {t("questionAr")} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="question_ar"
                        name="question_ar"
                        value={formData.question_ar}
                        onChange={handleInputChange}
                        placeholder={t("questionArPlaceholder") || "Enter question in Arabic"}
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>
                        {t("answerAr")} <span className="text-red-500">*</span>
                      </Label>
                      <RichTextEditor
                        value={formData.answer_ar}
                        onChange={(value) => handleEditorChange("answer_ar", value)}
                        placeholder={t("answerArPlaceholder") || "Enter answer in Arabic"}
                        dir="rtl"
                      />
                    </div>
                  </div>
                )}

                {/* English Content */}
                {activeTab === "en" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="question_en">{t("questionEn")}</Label>
                      <Input
                        id="question_en"
                        name="question_en"
                        value={formData.question_en}
                        onChange={handleInputChange}
                        placeholder={t("questionEnPlaceholder") || "Enter question in English"}
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("answerEn")}</Label>
                      <RichTextEditor
                        value={formData.answer_en}
                        onChange={(value) => handleEditorChange("answer_en", value)}
                        placeholder={t("answerEnPlaceholder") || "Enter answer in English"}
                        dir="ltr"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order */}
                <div className="space-y-2">
                  <Label htmlFor="order" className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    {t("order")}
                  </Label>
                  <Input
                    id="order"
                    name="order"
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={handleInputChange}
                    placeholder="1"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("orderHint") || "Lower numbers appear first"}
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <Label>{t("status")}</Label>
                    <p className="text-xs text-muted-foreground">
                      {t("statusHint") || "Active FAQs are visible to users"}
                    </p>
                  </div>
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.push(`/${locale}/admin/settings/faqs`)}
              >
                <X className="w-4 h-4 me-2" />
                {tCommon("cancel")}
              </Button>
              <Button type="submit" disabled={saving} className="flex-1">
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin me-2" />
                    {t("saving")}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 me-2" />
                    {t("updateFaq")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
