"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Edit,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Info,
  ScrollText,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import SettingsService from "@/lib/services/settings.service";

export default function InfoPagesListPage() {
  const t = useTranslations("infoPages");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([
    {
      slug: "about-us",
      icon: Info,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      title_ar: "",
      title_en: "",
      hasContent: false,
    },
    {
      slug: "terms-and-conditions",
      icon: ScrollText,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      title_ar: "",
      title_en: "",
      hasContent: false,
    },
  ]);

  // Fetch info pages data
  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const [aboutUs, terms] = await Promise.all([
          SettingsService.getInfoPage("about-us").catch(() => null),
          SettingsService.getInfoPage("terms-and-conditions").catch(() => null),
        ]);

        // Helper function to extract translation data
        const getTranslationData = (data) => {
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

        setPages((prev) =>
          prev.map((page) => {
            if (page.slug === "about-us" && (aboutUs?.success || aboutUs?.status === "success") && aboutUs?.data) {
              const trans = getTranslationData(aboutUs.data);
              return {
                ...page,
                title_ar: trans.title_ar,
                title_en: trans.title_en,
                hasContent: !!(trans.content_ar || trans.content_en),
              };
            }
            if (page.slug === "terms-and-conditions" && (terms?.success || terms?.status === "success") && terms?.data) {
              const trans = getTranslationData(terms.data);
              return {
                ...page,
                title_ar: trans.title_ar,
                title_en: trans.title_en,
                hasContent: !!(trans.content_ar || trans.content_en),
              };
            }
            return page;
          })
        );
      } catch (error) {
        console.error("Error fetching info pages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const getPageTitle = (page) => {
    if (locale === "ar" && page.title_ar) return page.title_ar;
    if (page.title_en) return page.title_en;
    return t(page.slug);
  };

  return (
    <DashboardLayout requiredUserType="admin">
      <Toaster position="top-center" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href={`/${locale}/admin/users`} className="hover:text-foreground transition-colors">
          {tCommon("home") || "Home"}
        </Link>
        <ArrowIcon className="w-4 h-4" />
        <span className="text-foreground font-medium">{t("title")}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Info Pages Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Card key={page.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${page.bgColor}`}>
                        <Icon className={`w-6 h-6 ${page.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{getPageTitle(page)}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t(`${page.slug}Desc`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {page.hasContent ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          {t("hasContent")}
                        </span>
                      ) : (
                        <span className="text-amber-600 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          {t("noContent")}
                        </span>
                      )}
                    </div>
                    <Link href={`/${locale}/admin/settings/info-pages/edit/${page.slug}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="w-4 h-4" />
                        {t("edit")}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
