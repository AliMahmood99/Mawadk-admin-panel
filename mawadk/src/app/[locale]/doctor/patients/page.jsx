"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserPlus,
  UserCheck,
  Search,
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { users } from "@/data/mock/users";
import { appointments } from "@/data/mock/appointments";

export default function DoctorPatientsPage() {
  const t = useTranslations("doctor.patients");
  const tCommon = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get unique patients who had appointments with doctor_id = 1
  const doctorAppointments = appointments.filter((apt) => apt.doctor_id === 1);
  const patientIds = [...new Set(doctorAppointments.map((apt) => apt.user_id))];
  const patients = users.filter((user) => patientIds.includes(user.id));

  // Calculate analytics
  const totalPatients = patients.length;
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const newPatients = patients.filter((patient) => {
    const createdDate = new Date(patient.created_at);
    return (
      createdDate.getMonth() === thisMonth &&
      createdDate.getFullYear() === thisYear
    );
  }).length;

  // Calculate returning patients (patients with more than 1 appointment)
  const returningPatients = patientIds.filter((patientId) => {
    const patientAppointments = doctorAppointments.filter(
      (apt) => apt.user_id === patientId
    );
    return patientAppointments.length > 1;
  }).length;

  // Filter by search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
  );

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  // Get patient stats
  const getPatientStats = (patientId) => {
    const patientAppointments = doctorAppointments.filter(
      (apt) => apt.user_id === patientId
    );
    const lastVisit = patientAppointments.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )[0];
    return {
      totalVisits: patientAppointments.length,
      lastVisit: lastVisit ? lastVisit.date : "N/A",
    };
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
    <DashboardLayout requiredUserType="doctor">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-600 mt-1">{t("subtitle")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-l-4 border-l-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("totalPatients")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {totalPatients}
                </p>
              </div>
              <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("newPatients")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {newPatients}
                </p>
                <p className="text-xs text-slate-500 mt-1">This month</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("returningPatients")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {returningPatients}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {totalPatients > 0
                    ? `${Math.round((returningPatients / totalPatients) * 100)}%`
                    : "0%"}{" "}
                  of total
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Patients Table */}
        <Card className="border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">
                {tCommon("all")} ({filteredPatients.length})
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
            {paginatedPatients.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">{t("noPatients")}</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("patientInfo")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      Contact
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      Location
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("totalVisits")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("lastVisit")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {tCommon("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPatients.map((patient) => {
                    const stats = getPatientStats(patient.id);
                    return (
                      <tr
                        key={patient.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {getInitials(patient.name)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">
                                {patient.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                ID: #{patient.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-slate-700">
                              <Mail className="h-4 w-4 text-slate-400" />
                              {patient.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-700">
                              <Phone className="h-4 w-4 text-slate-400" />
                              {patient.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span className="max-w-xs truncate">
                              {patient.address || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge
                            variant="outline"
                            className="bg-secondary/10 text-secondary border-secondary/30"
                          >
                            {stats.totalVisits} visits
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            {stats.lastVisit}
                          </div>
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
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {filteredPatients.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredPatients.length)} of{" "}
                {filteredPatients.length}
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
