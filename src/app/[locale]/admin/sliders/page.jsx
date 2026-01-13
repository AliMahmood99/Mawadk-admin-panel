"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Image as ImageIcon,
  MousePointerClick,
  TrendingUp,
  CheckCircle,
  XCircle,
  ExternalLink,
  Link2,
  GripVertical
} from "lucide-react";
import { sliders } from "@/data/mock/sliders";

export default function SlidersPage() {
  const t = useTranslations("sliders");
  const tCommon = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const itemsPerPage = 10;

  // Filter sliders based on search
  const filteredSliders = sliders.filter(
    (slider) =>
      slider.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slider.title_ar.includes(searchQuery) ||
      slider.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredSliders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSliders = filteredSliders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate analytics
  const totalSliders = sliders.length;
  const activeSliders = sliders.filter(s => s.status === "active").length;
  const totalViews = sliders.reduce((sum, s) => sum + s.views, 0);
  const totalClicks = sliders.reduce((sum, s) => sum + s.clicks, 0);
  const avgCTR = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : 0;

  const toggleDropdown = (sliderId) => {
    setOpenDropdown(openDropdown === sliderId ? null : sliderId);
  };

  const getLinkTypeLabel = (type) => {
    switch(type) {
      case "internal": return t("internal");
      case "external": return t("external");
      default: return type;
    }
  };

  const getLinkToLabel = (linkTo) => {
    switch(linkTo) {
      case "specialties": return t("specialties");
      case "hospitals": return t("hospitals");
      case "doctors": return t("doctors");
      case "url": return t("url");
      default: return linkTo;
    }
  };

  return (
    <DashboardLayout requiredUserType="admin">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-600 mt-1">{t("subtitle")}</p>
        </div>
        <Button className="gap-2 h-10 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          {t("addSlider")}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalSliders")}
              </CardTitle>
              <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalSliders.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">All sliders</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("activeSliders")}
              </CardTitle>
              <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {activeSliders.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-600 mt-1">
              {Math.round((activeSliders / totalSliders) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalViews")}
              </CardTitle>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Total impressions</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalClicks")}
              </CardTitle>
              <div className="h-10 w-10 bg-pink-50 rounded-lg flex items-center justify-center">
                <MousePointerClick className="h-5 w-5 text-pink-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalClicks.toLocaleString()}
            </div>
            <p className="text-xs text-pink-600 mt-1">
              {avgCTR}% average CTR
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card className="border-slate-200">
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">
                {tCommon("all")} ({filteredSliders.length})
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder={tCommon("search")}
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-visible">
            {paginatedSliders.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">{t("noSliders")}</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left w-10">
                      <GripVertical className="h-4 w-4 text-slate-400" />
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("preview")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("titleAndSubtitle")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("type")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("linkTo")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("analytics")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {tCommon("status")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {tCommon("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSliders.map((slider, index) => (
                    <tr
                      key={slider.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-all"
                    >
                      <td className="py-4 px-6">
                        <div className="cursor-move">
                          <GripVertical className="h-4 w-4 text-slate-400" />
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-16 w-28 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center border-2 border-slate-200">
                          <ImageIcon className="h-6 w-6 text-primary/60" />
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="max-w-xs">
                          <div className="font-medium text-slate-900 truncate">
                            {slider.title}
                          </div>
                          <div className="text-xs text-slate-500 truncate mt-1">
                            {slider.title_ar}
                          </div>
                          <div className="text-xs text-slate-400 truncate mt-1">
                            {slider.subtitle}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant="outline"
                          className={
                            slider.type === "internal"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                          }
                        >
                          {slider.type === "internal" ? (
                            <Link2 className="h-3 w-3 mr-1" />
                          ) : (
                            <ExternalLink className="h-3 w-3 mr-1" />
                          )}
                          {getLinkTypeLabel(slider.type)}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-slate-700">
                          {getLinkToLabel(slider.link_to)}
                        </div>
                        <div className="text-xs text-slate-400 truncate max-w-xs mt-1">
                          {slider.link_value}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <Eye className="h-3 w-3 text-slate-400" />
                            <span className="text-slate-600">
                              {slider.views.toLocaleString()} {t("views")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <MousePointerClick className="h-3 w-3 text-slate-400" />
                            <span className="text-slate-600">
                              {slider.clicks.toLocaleString()} {t("clicks")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <TrendingUp className="h-3 w-3 text-emerald-500" />
                            <span className="text-emerald-600 font-medium">
                              {slider.ctr}% {t("ctr")}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {slider.status === "active" ? (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 font-medium">
                            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                            {tCommon("active")}
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200 font-medium">
                            <XCircle className="h-3.5 w-3.5 mr-1.5" />
                            {tCommon("inactive")}
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 relative">
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(slider.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>

                            {openDropdown === slider.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  {tCommon("view")}
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  {tCommon("edit")}
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-rose-700 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100">
                                  <Trash2 className="h-4 w-4" />
                                  {tCommon("delete")}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-slate-200 gap-4">
              <div className="text-sm text-slate-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredSliders.length)} of{" "}
                {filteredSliders.length.toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  {tCommon("previous")}
                </Button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant="outline"
                      size="sm"
                      className={
                        currentPage === pageNum
                          ? "bg-pink-50 text-pink-600 border-pink-200"
                          : ""
                      }
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="text-slate-400">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  {tCommon("next")}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
