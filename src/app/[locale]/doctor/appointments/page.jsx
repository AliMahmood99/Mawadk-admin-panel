"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Edit,
  Trash2,
  CalendarClock,
  User,
} from "lucide-react";
import { appointments } from "@/data/mock/appointments";

export default function DoctorAppointmentsPage() {
  const t = useTranslations("doctor.appointments");
  const tCommon = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter appointments for doctor_id = 1 (assuming logged in doctor)
  const doctorAppointments = appointments.filter((apt) => apt.doctor_id === 1);

  // Calculate analytics
  const totalAppointments = doctorAppointments.length;
  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = doctorAppointments.filter(
    (apt) => apt.date === today
  ).length;
  const completedAppointments = doctorAppointments.filter(
    (apt) => apt.status === "completed"
  ).length;
  const upcomingAppointments = doctorAppointments.filter(
    (apt) => apt.status === "upcoming"
  ).length;

  // Filter by search query
  const filteredAppointments = doctorAppointments.filter(
    (apt) =>
      apt.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.hospital_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    endIndex
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <Clock className="h-3 w-3" />;
      case "completed":
        return <CheckCircle className="h-3 w-3" />;
      case "cancelled":
        return <XCircle className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  return (
    <DashboardLayout requiredUserType="doctor">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-600 mt-1">{t("subtitle")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 border-l-4 border-l-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("totalAppointments")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {totalAppointments}
                </p>
              </div>
              <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <CalendarClock className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("todayAppointments")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {todayAppointments}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("completed")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {completedAppointments}
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("upcoming")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {upcomingAppointments}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card className="border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">
                {tCommon("all")} ({filteredAppointments.length})
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
            {paginatedAppointments.length === 0 ? (
              <div className="text-center py-12">
                <CalendarClock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">
                  {t("noAppointments")}
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      ID
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("patientInfo")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("type")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("dateAndTime")}
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
                  {paginatedAppointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span className="font-medium text-slate-900">
                          #{apt.id}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {apt.user_name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {apt.hospital_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-700">{apt.specialty}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-700">
                              {apt.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-700">
                              {apt.time}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-secondary">
                          QAR {apt.consultation_fee}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          className={`${getStatusColor(
                            apt.status
                          )} border flex items-center gap-1 w-fit`}
                        >
                          {getStatusIcon(apt.status)}
                          <span className="capitalize">{apt.status}</span>
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {filteredAppointments.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredAppointments.length)} of{" "}
                {filteredAppointments.length}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  {tCommon("previous")}
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-secondary hover:bg-secondary/90"
                            : ""
                        }
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  {tCommon("next")}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
