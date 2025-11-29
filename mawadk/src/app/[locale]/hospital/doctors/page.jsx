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
  Stethoscope,
  Users,
  Star,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Award
} from "lucide-react";
import { doctors } from "@/data/mock/doctors";

export default function HospitalDoctorsPage() {
  const t = useTranslations("hospital.doctors");
  const tCommon = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const itemsPerPage = 10;

  // Filter doctors for hospital_id = 1 (Sunrise Medical Center)
  const hospitalDoctors = doctors.filter(d => d.hospital_id === 1);

  // Filter based on search
  const filteredDoctors = hospitalDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.name_ar.includes(searchQuery) ||
      doctor.specialty_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate analytics
  const totalDoctors = hospitalDoctors.length;
  const activeDoctors = hospitalDoctors.filter(d => d.status === "active").length;
  const totalPatients = hospitalDoctors.reduce((sum, d) => sum + d.patients_count, 0);
  const avgRating = (hospitalDoctors.reduce((sum, d) => sum + d.rating, 0) / hospitalDoctors.length).toFixed(1);

  const toggleDropdown = (doctorId) => {
    setOpenDropdown(openDropdown === doctorId ? null : doctorId);
  };

  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout requiredUserType="hospital">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-600 mt-1">{t("subtitle")}</p>
        </div>
        <Button className="gap-2 h-10 bg-secondary hover:bg-secondary/90">
          <Plus className="w-4 h-4" />
          {t("addDoctor")}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalDoctors")}
              </CardTitle>
              <div className="h-10 w-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalDoctors.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">All doctors</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("activeDoctors")}
              </CardTitle>
              <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {activeDoctors.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-600 mt-1">
              {Math.round((activeDoctors / totalDoctors) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalPatients")}
              </CardTitle>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalPatients.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Across all doctors</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("avgRating")}
              </CardTitle>
              <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {avgRating}
            </div>
            <p className="text-xs text-amber-600 mt-1">
              <Star className="h-3 w-3 inline fill-current" /> Excellent rating
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
                {tCommon("all")} ({filteredDoctors.length})
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
          <div className="overflow-x-auto">
            {paginatedDoctors.length === 0 ? (
              <div className="text-center py-12">
                <Stethoscope className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">{t("noDoctors")}</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("doctorInfo")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("specialty")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("experience")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("patients")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("rating")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("fee")}
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
                  {paginatedDoctors.map((doctor, index) => (
                    <tr
                      key={doctor.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-all"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 bg-gradient-to-br from-secondary to-secondary/70 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {getInitials(doctor.name)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{doctor.name}</div>
                            <div className="text-xs text-slate-500">{doctor.name_ar}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{doctor.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-900">{doctor.specialty_name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{doctor.specialty_name_ar}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">
                            {doctor.experience_years} {t("years")}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">
                            {doctor.patients_count.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-current" />
                            <span className="text-sm font-medium text-slate-900">{doctor.rating}</span>
                          </div>
                          <span className="text-xs text-slate-500">
                            ({doctor.reviews_count})
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-sm font-medium text-slate-900">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                          {doctor.consultation_fee} QAR
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {doctor.status === "active" ? (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 font-medium">
                            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                            {tCommon("active")}
                          </Badge>
                        ) : doctor.status === "pending" ? (
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 font-medium">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            {tCommon("pending")}
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
                                toggleDropdown(doctor.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>

                            {openDropdown === doctor.id && (
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
                {Math.min(startIndex + itemsPerPage, filteredDoctors.length)} of{" "}
                {filteredDoctors.length.toLocaleString()}
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
