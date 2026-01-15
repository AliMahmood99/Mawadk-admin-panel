"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Stethoscope, Star, Calendar, DollarSign, Edit3, Eye, Trash2,
  MoreVertical, Clock, TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import ProviderDoctorsService from "@/lib/services/provider-doctors.service";

export default function ProviderDoctorsTable({
  doctors = [],
  onEdit,
  onView,
  onRefresh,
  locale = "ar",
}) {
  const t = useTranslations("providerDoctors");
  const tc = useTranslations("common");
  const [togglingId, setTogglingId] = useState(null);

  const handleToggleStatus = async (doctorId) => {
    setTogglingId(doctorId);
    try {
      const result = await ProviderDoctorsService.toggleDoctorStatus(doctorId);
      if (result.success) {
        toast.success(result.message);
        onRefresh?.();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(t("statusError"));
    } finally {
      setTogglingId(null);
    }
  };

  const renderStars = (rating) => {
    if (!rating) return <span className="text-slate-400 text-sm">-</span>;
    const ratingNum = parseFloat(rating);
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="font-medium">{ratingNum.toFixed(1)}</span>
      </div>
    );
  };

  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Stethoscope className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{t("noDoctors")}</h3>
        <p className="text-slate-500 max-w-sm">{t("noDoctorsDesc")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="text-start py-4 px-4 text-sm font-semibold text-slate-600">{t("doctor")}</th>
              <th className="text-start py-4 px-4 text-sm font-semibold text-slate-600">{t("specialty")}</th>
              <th className="text-start py-4 px-4 text-sm font-semibold text-slate-600">{t("experience")}</th>
              <th className="text-start py-4 px-4 text-sm font-semibold text-slate-600">{t("price")}</th>
              <th className="text-start py-4 px-4 text-sm font-semibold text-slate-600">{t("bookings")}</th>
              <th className="text-start py-4 px-4 text-sm font-semibold text-slate-600">{t("rating")}</th>
              <th className="text-start py-4 px-4 text-sm font-semibold text-slate-600">{t("status")}</th>
              <th className="text-center py-4 px-4 text-sm font-semibold text-slate-600">{tc("actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-slate-50/50 transition-colors">
                {/* Doctor Info */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {doctor.image ? (
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                          <Stethoscope className="h-6 w-6 text-white" />
                        </div>
                      )}
                      {doctor.discount_percentage && parseFloat(doctor.discount_percentage) > 0 && (
                        <span className="absolute -top-1 -end-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          -{Math.round(parseFloat(doctor.discount_percentage))}%
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{doctor.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">
                        {doctor.short_description}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Specialty */}
                <td className="py-4 px-4">
                  <Badge variant="secondary" className="gap-1.5">
                    {doctor.category?.image && (
                      <img src={doctor.category.image} alt="" className="w-4 h-4 rounded" />
                    )}
                    {doctor.category?.name || "-"}
                  </Badge>
                </td>

                {/* Experience */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>{doctor.experience_years} {t("years")}</span>
                  </div>
                </td>

                {/* Price */}
                <td className="py-4 px-4">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-primary">
                      {doctor.price_after_discount} {t("currency")}
                    </div>
                    {parseFloat(doctor.price_before_discount) > parseFloat(doctor.price_after_discount) && (
                      <div className="text-xs text-slate-400 line-through">
                        {doctor.price_before_discount} {t("currency")}
                      </div>
                    )}
                  </div>
                </td>

                {/* Bookings */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{doctor.bookings_count || 0}</span>
                  </div>
                </td>

                {/* Rating */}
                <td className="py-4 px-4">
                  {renderStars(doctor.ratings_avg_rating)}
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <Switch
                    checked={doctor.status}
                    onCheckedChange={() => handleToggleStatus(doctor.id)}
                    disabled={togglingId === doctor.id}
                  />
                </td>

                {/* Actions */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-primary"
                      onClick={() => onView?.(doctor)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-primary"
                      onClick={() => onEdit?.(doctor)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white border border-slate-200 rounded-xl p-4 space-y-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                      <Stethoscope className="h-7 w-7 text-white" />
                    </div>
                  )}
                  {doctor.discount_percentage && parseFloat(doctor.discount_percentage) > 0 && (
                    <span className="absolute -top-1 -end-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      -{Math.round(parseFloat(doctor.discount_percentage))}%
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{doctor.name}</h4>
                  <Badge variant="secondary" className="mt-1 gap-1">
                    {doctor.category?.name || "-"}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView?.(doctor)}>
                    <Eye className="h-4 w-4 me-2" />
                    {tc("view")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit?.(doctor)}>
                    <Edit3 className="h-4 w-4 me-2" />
                    {tc("edit")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">{t("price")}</div>
                <div className="font-semibold text-primary">
                  {doctor.price_after_discount} {t("currency")}
                </div>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">{t("bookings")}</div>
                <div className="font-semibold">{doctor.bookings_count || 0}</div>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">{t("rating")}</div>
                <div className="font-semibold flex items-center justify-center gap-1">
                  {doctor.ratings_avg_rating ? (
                    <>
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {parseFloat(doctor.ratings_avg_rating).toFixed(1)}
                    </>
                  ) : "-"}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                <span>{doctor.experience_years} {t("years")}</span>
              </div>
              <Switch
                checked={doctor.status}
                onCheckedChange={() => handleToggleStatus(doctor.id)}
                disabled={togglingId === doctor.id}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
