"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Eye, Building2, MoreVertical, Mail, Phone, Star, CheckCircle, XCircle, MapPin, Users as UsersIcon } from "lucide-react";
import { hospitals } from "@/data/mock/hospitals";

export default function HospitalsPage() {
  const t = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const itemsPerPage = 10;

  // Filter hospitals based on search
  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.name_ar.includes(searchQuery) ||
      hospital.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.phone.includes(searchQuery)
  );

  // Pagination
  const totalPages = Math.ceil(filteredHospitals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHospitals = filteredHospitals.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate analytics
  const totalHospitals = hospitals.length;
  const activeHospitals = hospitals.filter(h => h.status === "active").length;
  const totalDoctors = hospitals.reduce((sum, h) => sum + h.doctors_count, 0);

  const toggleDropdown = (hospitalId) => {
    setOpenDropdown(openDropdown === hospitalId ? null : hospitalId);
  };

  return (
    <DashboardLayout requiredUserType="admin">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hospitals & Clinics</h1>
          <p className="text-slate-600 mt-1">Manage all registered hospitals and clinics</p>
        </div>
        <Button className="gap-2 h-10 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Add Hospital
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Total Hospitals</CardTitle>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalHospitals.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">All registered hospitals</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Active Hospitals</CardTitle>
              <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{activeHospitals.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 mt-1">
              {Math.round((activeHospitals / totalHospitals) * 100)}% of total hospitals
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Total Doctors</CardTitle>
              <div className="h-10 w-10 bg-pink-50 rounded-lg flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-pink-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalDoctors.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">Across all hospitals</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card className="border-slate-200">
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">All Hospitals ({filteredHospitals.length})</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search"
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
            {paginatedHospitals.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No hospitals found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left w-16">#</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Name</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Contact</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Location</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Doctors</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Rating</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Status</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedHospitals.map((hospital) => (
                    <tr
                      key={hospital.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-slate-500">
                          #{hospital.id}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{hospital.name}</div>
                            <div className="text-xs text-slate-500">{hospital.name_ar}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-slate-700">
                            <Mail className="h-3 w-3 text-slate-400" />
                            {hospital.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-700">
                            <Phone className="h-3 w-3 text-slate-400" />
                            {hospital.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-sm text-slate-700">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span className="text-xs">{hospital.address}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-slate-700">
                          {hospital.doctors_count} doctors
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="font-medium text-slate-900">{hospital.rating}</span>
                          <span className="text-xs text-slate-500">
                            ({hospital.reviews_count})
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {hospital.status === "active" ? (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 font-medium">
                            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200 font-medium">
                            <XCircle className="h-3.5 w-3.5 mr-1.5" />
                            Inactive
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
                                toggleDropdown(hospital.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>

                            {openDropdown === hospital.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  Edit Hospital
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-rose-700 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100">
                                  <Trash2 className="h-4 w-4" />
                                  Delete Hospital
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
                {Math.min(startIndex + itemsPerPage, filteredHospitals.length)} of{" "}
                {filteredHospitals.length.toLocaleString()} hospitals
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  {t("previous")}
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
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  {t("next")}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
