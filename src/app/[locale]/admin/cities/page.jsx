"use client";

import React, { useState } from "react";
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
  MapPin,
  Users,
  Building2,
  Stethoscope,
  CheckCircle,
  XCircle,
  Map,
  ChevronRight
} from "lucide-react";
import { cities } from "@/data/mock/cities";

export default function CitiesPage() {
  const t = useTranslations("cities");
  const tCommon = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const itemsPerPage = 10;

  // Filter cities based on search
  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.name_ar.includes(searchQuery) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCities = filteredCities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate analytics
  const totalCities = cities.length;
  const activeCities = cities.filter(c => c.status === "active").length;
  const totalAreas = cities.reduce((sum, c) => sum + c.areas_count, 0);
  const totalUsers = cities.reduce((sum, c) => sum + c.users_count, 0);

  const toggleDropdown = (cityId) => {
    setOpenDropdown(openDropdown === cityId ? null : cityId);
  };

  const handleViewAreas = (city) => {
    setSelectedCity(selectedCity?.id === city.id ? null : city);
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
          {t("addCity")}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalCities")}
              </CardTitle>
              <div className="h-10 w-10 bg-cyan-50 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-cyan-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalCities.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">All cities</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("activeCities")}
              </CardTitle>
              <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {activeCities.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-600 mt-1">
              {Math.round((activeCities / totalCities) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalAreas")}
              </CardTitle>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Map className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalAreas.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Across all cities</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalUsers")}
              </CardTitle>
              <div className="h-10 w-10 bg-pink-50 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-pink-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Platform users</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card className="border-slate-200">
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">
                {tCommon("all")} ({filteredCities.length})
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
            {paginatedCities.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">{t("noCities")}</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left w-16">
                      {t("flag")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("cityAndCountry")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("areas")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      Doctors
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      Users
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
                  {paginatedCities.map((city, index) => (
                    <React.Fragment key={city.id}>
                      <tr
                        className="border-b border-slate-100 hover:bg-slate-50 transition-all"
                      >
                        <td className="py-4 px-6">
                          <div className="text-3xl">{city.flag}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="max-w-xs">
                            <div className="font-medium text-slate-900">
                              {city.name}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              {city.name_ar}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              {city.country}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 h-8"
                            onClick={() => handleViewAreas(city)}
                          >
                            <Map className="h-3.5 w-3.5" />
                            {city.areas_count} {t("areas")}
                            <ChevronRight className={`h-3.5 w-3.5 transition-transform ${selectedCity?.id === city.id ? 'rotate-90' : ''}`} />
                          </Button>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Stethoscope className="h-3.5 w-3.5 text-slate-400" />
                            {city.doctors_count.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Users className="h-3.5 w-3.5 text-slate-400" />
                            {city.users_count.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {city.status === "active" ? (
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
                                  toggleDropdown(city.id);
                                }}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>

                              {openDropdown === city.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    {tCommon("view")}
                                  </button>
                                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                    <Edit className="h-4 w-4" />
                                    {tCommon("edit")}
                                  </button>
                                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                    <Map className="h-4 w-4" />
                                    {t("manageAreas")}
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

                      {/* Areas Expandable Section */}
                      {selectedCity?.id === city.id && (
                        <tr className="bg-slate-50/50">
                          <td colSpan="7" className="px-6 py-4">
                            <div className="ml-12">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-slate-900 text-sm">
                                  {t("areas")} in {city.name}
                                </h4>
                                <Button size="sm" className="h-8 gap-2">
                                  <Plus className="h-3.5 w-3.5" />
                                  {t("addArea")}
                                </Button>
                              </div>

                              {city.areas.length === 0 ? (
                                <div className="text-center py-8 bg-white rounded-lg border border-slate-200">
                                  <Map className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                                  <p className="text-slate-500 text-sm">{t("noAreas")}</p>
                                </div>
                              ) : (
                                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                                  <table className="w-full">
                                    <thead>
                                      <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="py-3 px-4 text-xs font-semibold text-slate-700 text-left">
                                          {t("areaName")}
                                        </th>
                                        <th className="py-3 px-4 text-xs font-semibold text-slate-700 text-left">
                                          Doctors
                                        </th>
                                        <th className="py-3 px-4 text-xs font-semibold text-slate-700 text-left">
                                          Users
                                        </th>
                                        <th className="py-3 px-4 text-xs font-semibold text-slate-700 text-left">
                                          {tCommon("status")}
                                        </th>
                                        <th className="py-3 px-4 text-xs font-semibold text-slate-700 text-left">
                                          {tCommon("actions")}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {city.areas.map((area) => (
                                        <tr key={area.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                          <td className="py-3 px-4">
                                            <div className="text-sm font-medium text-slate-900">
                                              {area.name}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-0.5">
                                              {area.name_ar}
                                            </div>
                                          </td>
                                          <td className="py-3 px-4">
                                            <div className="flex items-center gap-1.5 text-sm text-slate-700">
                                              <Stethoscope className="h-3 w-3 text-slate-400" />
                                              {area.doctors_count}
                                            </div>
                                          </td>
                                          <td className="py-3 px-4">
                                            <div className="flex items-center gap-1.5 text-sm text-slate-700">
                                              <Users className="h-3 w-3 text-slate-400" />
                                              {area.users_count}
                                            </div>
                                          </td>
                                          <td className="py-3 px-4">
                                            {area.status === "active" ? (
                                              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 font-medium text-xs">
                                                {tCommon("active")}
                                              </Badge>
                                            ) : (
                                              <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200 font-medium text-xs">
                                                {tCommon("inactive")}
                                              </Badge>
                                            )}
                                          </td>
                                          <td className="py-3 px-4">
                                            <div className="flex items-center gap-1">
                                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                                <Edit className="h-3.5 w-3.5" />
                                              </Button>
                                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                                                <Trash2 className="h-3.5 w-3.5" />
                                              </Button>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
                {Math.min(startIndex + itemsPerPage, filteredCities.length)} of{" "}
                {filteredCities.length.toLocaleString()}
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
