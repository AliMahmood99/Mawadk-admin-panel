"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight, Building2, Stethoscope, Mail, Phone, MapPin, Clock,
  Star, Users, DollarSign, Edit3, CheckCircle, XCircle, Loader2,
  Calendar, User, Globe, BookOpen
} from "lucide-react";
import ProvidersService from "@/lib/services/providers.service";
import toast from "react-hot-toast";

export default function ViewProviderPage() {
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const router = useRouter();
  const { locale, id } = useParams();

  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch provider data
  useEffect(() => {
    const fetchProvider = async () => {
      setIsLoading(true);
      try {
        const result = await ProvidersService.getProviderById(id);
        if (result.success && result.data) {
          setProvider(result.data);
        } else {
          toast.error(result.message || t("fetchError"));
          router.push(`/${locale}/admin/providers`);
        }
      } catch (error) {
        console.error("Error fetching provider:", error);
        toast.error(t("fetchError"));
        router.push(`/${locale}/admin/providers`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  // Handle toggle status
  const handleToggleStatus = async () => {
    const loadingToast = toast.loading(t("updatingStatus"));
    try {
      const result = await ProvidersService.updateProviderStatus(id);
      toast.dismiss(loadingToast);
      if (result.success) {
        toast.success(result.message);
        // Refresh provider data
        const refreshResult = await ProvidersService.getProviderById(id);
        if (refreshResult.success) {
          setProvider(refreshResult.data);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t("statusError"));
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Hospital": return Building2;
      case "Clinic": return Building2;
      case "Doctor": return Stethoscope;
      default: return Building2;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "Hospital":
        return { color: "bg-blue-100 text-blue-700 border-blue-200", label: t("hospital") };
      case "Clinic":
        return { color: "bg-purple-100 text-purple-700 border-purple-200", label: t("clinic") };
      case "Doctor":
        return { color: "bg-emerald-100 text-emerald-700 border-emerald-200", label: t("doctor") };
      default:
        return { color: "bg-slate-100 text-slate-700 border-slate-200", label: type };
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout requiredUserType="admin">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-slate-500">{t("loading")}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!provider) {
    return (
      <DashboardLayout requiredUserType="admin">
        <div className="text-center py-16">
          <Building2 className="h-16 w-16 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">{t("notFound")}</h3>
        </div>
      </DashboardLayout>
    );
  }

  const TypeIcon = getTypeIcon(provider.type);
  const typeBadge = getTypeBadge(provider.type);

  // Get translations
  const arTranslation = provider.translations?.find(tr => tr.locale === "ar") || {};
  const enTranslation = provider.translations?.find(tr => tr.locale === "en") || {};

  return (
    <DashboardLayout requiredUserType="admin">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/${locale}/admin/providers`)}
            className="h-10 w-10"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t("providerDetails")}</h1>
            <p className="text-slate-500 mt-1">{t("providerDetailsDesc")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleToggleStatus}
            className="gap-2"
          >
            {provider.is_active ? (
              <>
                <XCircle className="h-4 w-4 text-amber-500" />
                {t("deactivate")}
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                {t("activate")}
              </>
            )}
          </Button>
          <Button
            onClick={() => router.push(`/${locale}/admin/providers/edit/${id}`)}
            className="gap-2"
          >
            <Edit3 className="h-4 w-4" />
            {t("editProvider")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Provider Info Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {provider.image ? (
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                    <TypeIcon className="h-12 w-12 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-slate-900">{provider.name}</h2>
                    <Badge className={`${typeBadge.color} border`}>
                      <TypeIcon className="h-3 w-3 me-1" />
                      {typeBadge.label}
                    </Badge>
                    {provider.is_active ? (
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

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">{provider.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span className="text-sm" dir="ltr">{provider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">{provider.experience_years} {t("yearsExperience")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm">
                        {provider.ratings_avg_rating ? parseFloat(provider.ratings_avg_rating).toFixed(1) : "-"} ({provider.ratings_count || 0} {t("reviews")})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Translations */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t("translations")}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Arabic */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="h-6 w-6 rounded bg-slate-100 flex items-center justify-center text-xs">AR</span>
                  {t("arabic")}
                </h4>
                <div className="space-y-2 ps-8">
                  <div>
                    <span className="text-sm text-slate-500">{t("name")}:</span>
                    <p className="text-slate-900">{arTranslation.name || "-"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">{t("address")}:</span>
                    <p className="text-slate-900">{arTranslation.address || "-"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">{t("description")}:</span>
                    <p className="text-slate-900">{arTranslation.description || "-"}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* English */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="h-6 w-6 rounded bg-slate-100 flex items-center justify-center text-xs">EN</span>
                  {t("english")}
                </h4>
                <div className="space-y-2 ps-8" dir="ltr">
                  <div>
                    <span className="text-sm text-slate-500">Name:</span>
                    <p className="text-slate-900">{enTranslation.name || "-"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Address:</span>
                    <p className="text-slate-900">{enTranslation.address || "-"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Description:</span>
                    <p className="text-slate-900">{enTranslation.description || "-"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t("categories")}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {provider.categories && provider.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {provider.categories.map(category => (
                    <Badge
                      key={category.id}
                      variant="secondary"
                      className="px-3 py-1.5 text-sm"
                    >
                      {category.image && (
                        <img src={category.image} alt={category.name} className="h-4 w-4 rounded me-2" />
                      )}
                      {category.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">{t("noCategories")}</p>
              )}
            </CardContent>
          </Card>

          {/* Working Schedule */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t("workingSchedule")}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {provider.schedules && provider.schedules.length > 0 ? (
                <div className="space-y-2">
                  {provider.schedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <span className="font-medium text-slate-900">{schedule.day}</span>
                      <span className="text-slate-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">{t("noSchedule")}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("statistics")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{t("bookings")}</span>
                </div>
                <span className="font-bold text-slate-900">{provider.bookings_count || 0}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{t("totalRevenue")}</span>
                </div>
                <span className="font-bold text-slate-900">
                  {provider.bookings_sum_total ? parseFloat(provider.bookings_sum_total).toLocaleString() : 0}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-slate-600">{t("rating")}</span>
                </div>
                <span className="font-bold text-slate-900">
                  {provider.ratings_avg_rating ? parseFloat(provider.ratings_avg_rating).toFixed(1) : "-"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{t("thisMonth")}</span>
                </div>
                <span className="font-bold text-primary">
                  {provider.total_booking_revenue_this_month || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Owner Info */}
          {provider.owner && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("ownerInfo")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{provider.owner.name}</p>
                    <p className="text-xs text-slate-500">{t("owner")}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{provider.owner.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600" dir="ltr">{provider.owner.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pricing (Doctor Only) */}
          {provider.type === "Doctor" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("pricing")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{t("priceBeforeDiscount")}</span>
                  <span className="font-medium text-slate-900 line-through">
                    {provider.price_before_discount} {t("currency")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{t("priceAfterDiscount")}</span>
                  <span className="font-bold text-primary text-lg">
                    {provider.price_after_discount} {t("currency")}
                  </span>
                </div>
                {provider.discount_percentage && provider.discount_percentage !== "0.00" && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">{t("discount")}</span>
                    <Badge className="bg-rose-100 text-rose-700">
                      {provider.discount_percentage}%
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("dates")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{t("createdAt")}</span>
                <span className="text-slate-900">{provider.created_at}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{t("updatedAt")}</span>
                <span className="text-slate-900">{provider.updated_at}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
