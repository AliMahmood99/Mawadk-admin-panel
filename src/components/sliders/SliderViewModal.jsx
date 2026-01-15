"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Image as ImageIcon, Edit3, Calendar, Globe, CheckCircle, XCircle,
  Building2, Stethoscope, User, ExternalLink, Link2, ArrowUpDown
} from "lucide-react";
import SlidersService from "@/lib/services/sliders.service";

export default function SliderViewModal({
  open,
  onOpenChange,
  slider,
  onEdit,
}) {
  const t = useTranslations("sliders");
  const tc = useTranslations("common");
  const locale = useLocale();

  if (!slider) return null;

  const arTrans = slider.translations?.find(t => t.locale === "ar") || {};
  const enTrans = slider.translations?.find(t => t.locale === "en") || {};

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "Hospital": return <Building2 className="h-4 w-4" />;
      case "Clinic": return <Stethoscope className="h-4 w-4" />;
      case "Doctor": return <User className="h-4 w-4" />;
      case "URL": return <ExternalLink className="h-4 w-4" />;
      default: return <ImageIcon className="h-4 w-4" />;
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">{t("sliderDetails")}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className={`gap-1.5 ${SlidersService.getTypeBadgeColor(slider.type)}`}
                  >
                    {getTypeIcon(slider.type)}
                    {t(`type${slider.type}`)}
                  </Badge>
                  {slider.status ? (
                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="h-3 w-3 me-1" />
                      {tc("active")}
                    </Badge>
                  ) : (
                    <Badge className="bg-rose-50 text-rose-700 border border-rose-200">
                      <XCircle className="h-3 w-3 me-1" />
                      {tc("inactive")}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onOpenChange(false);
                onEdit?.(slider);
              }}
              className="gap-2"
            >
              <Edit3 className="h-4 w-4" />
              {tc("edit")}
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 py-4">
          {/* Image Preview */}
          <div className="w-full aspect-[16/7] rounded-xl overflow-hidden bg-slate-100 border">
            {slider.image ? (
              <img
                src={slider.image}
                alt={slider.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-slate-300" />
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-2">
                <ArrowUpDown className="h-4 w-4" />
                <span className="text-xs">{t("sortOrder")}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{slider.sort}</div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-2">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">{t("startDate")}</span>
              </div>
              <div className="text-sm font-medium text-slate-900">
                {formatDate(slider.start_at)}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-2">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">{t("endDate")}</span>
              </div>
              <div className="text-sm font-medium text-slate-900">
                {formatDate(slider.end_at)}
              </div>
            </div>
          </div>

          {/* Link Info */}
          {slider.type !== "None" && (
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary" />
                {t("linkDestination")}
              </h4>
              {slider.type === "URL" ? (
                <a
                  href={slider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  {slider.url}
                </a>
              ) : slider.typeModel ? (
                <div className="flex items-center gap-3">
                  {slider.typeModel.image && (
                    <img
                      src={slider.typeModel.image}
                      alt={slider.typeModel.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-slate-900">{slider.typeModel.name}</p>
                    {slider.typeModel.phone && (
                      <p className="text-sm text-slate-500">{slider.typeModel.phone}</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-slate-500">{t("noLinkData")}</p>
              )}
            </div>
          )}

          {/* Translations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              {t("translations")}
            </h4>

            {/* Arabic */}
            <div className="bg-slate-50 rounded-xl p-4" dir="rtl">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="h-6">AR</Badge>
                <span className="font-medium">{t("arabic")}</span>
              </div>
              <p className="text-slate-900 text-lg">{arTrans.title || slider.title || "-"}</p>
            </div>

            {/* English */}
            <div className="bg-slate-50 rounded-xl p-4" dir="ltr">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="h-6">EN</Badge>
                <span className="font-medium">English</span>
              </div>
              <p className="text-slate-900 text-lg">{enTrans.title || "-"}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t">
            <span>{t("createdAt")}: {slider.created_at}</span>
            <span>{t("updatedAt")}: {slider.updated_at}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
