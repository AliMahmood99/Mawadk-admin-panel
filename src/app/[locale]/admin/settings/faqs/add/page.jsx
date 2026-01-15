"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
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

export default function AddFaqPage() {
  const t = useTranslations("faqs");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === "ar";

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
      const dataToSend = {
        question_en: formData.question_en || formData.question_ar,
        question_ar: formData.question_ar,
        answer_en: formData.answer_en || formData.answer_ar,
        answer_ar: formData.answer_ar,
        order: parseInt(formData.order) || 1,
        is_active: formData.is_active ? 1 : 0,
      };

      const response = await SettingsService.createFaq(dataToSend);

      if (response.success) {
        toast.success(t("createSuccess") || "FAQ created successfully");
        router.push(`/admin/settings/faqs`);
      } else {
        toast.error(response.message || t("createError") || "Failed to create FAQ");
      }
    } catch (error) {
      console.error("Error creating FAQ:", error);
      toast.error(t("createError") || "Failed to create FAQ");
    } finally {
      setSaving(false);
    }
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

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
        <span className="text-foreground font-medium">{t("addFaq")}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          {t("addFaq")}
        </h1>
        <p className="text-muted-foreground">{t("addFaqDesc")}</p>
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
                onClick={() => router.push(`/admin/settings/faqs`)}
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
                    {t("saveFaq")}
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
