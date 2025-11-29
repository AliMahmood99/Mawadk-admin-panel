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
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  User,
  Stethoscope,
  Building2,
  CalendarCheck,
  CalendarX,
  CalendarClock,
  AlertCircle,
  Phone,
  FileText
} from "lucide-react";
import { appointments } from "@/data/mock/appointments";

export default function AppointmentsPage() {
  const t = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 10;

  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.hospital_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.user_phone.includes(searchQuery);

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate analytics
  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments.filter(a => a.status === "upcoming").length;
  const completedAppointments = appointments.filter(a => a.status === "completed").length;
  const cancelledAppointments = appointments.filter(a => a.status === "cancelled").length;
  const totalRevenue = appointments
    .filter(a => a.payment_status === "paid")
    .reduce((sum, a) => sum + a.consultation_fee, 0);

  const toggleDropdown = (appointmentId) => {
    setOpenDropdown(openDropdown === appointmentId ? null : appointmentId);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "upcoming":
        return <CalendarClock className="h-3.5 w-3.5 mr-1.5" />;
      case "completed":
        return <CalendarCheck className="h-3.5 w-3.5 mr-1.5" />;
      case "cancelled":
        return <CalendarX className="h-3.5 w-3.5 mr-1.5" />;
      default:
        return <Calendar className="h-3.5 w-3.5 mr-1.5" />;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case "paid":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "refunded":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <DashboardLayout requiredUserType="admin">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments Management</h1>
          <p className="text-slate-600 mt-1">Manage all appointment bookings</p>
        </div>
        <Button className="gap-2 h-10 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Add Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Total Appointments</CardTitle>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalAppointments.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">All bookings</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Upcoming</CardTitle>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <CalendarClock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{upcomingAppointments.toLocaleString()}</div>
            <p className="text-xs text-blue-600 mt-1">
              {Math.round((upcomingAppointments / totalAppointments) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Completed</CardTitle>
              <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CalendarCheck className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{completedAppointments.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 mt-1">
              {Math.round((completedAppointments / totalAppointments) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
              <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">QAR {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">From paid appointments</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card className="border-slate-200">
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">All Appointments ({filteredAppointments.length})</h3>
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={statusFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setStatusFilter("all");
                      setCurrentPage(1);
                    }}
                    className="h-9"
                  >
                    All
                  </Button>
                  <Button
                    variant={statusFilter === "upcoming" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setStatusFilter("upcoming");
                      setCurrentPage(1);
                    }}
                    className="h-9"
                  >
                    Upcoming
                  </Button>
                  <Button
                    variant={statusFilter === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setStatusFilter("completed");
                      setCurrentPage(1);
                    }}
                    className="h-9"
                  >
                    Completed
                  </Button>
                  <Button
                    variant={statusFilter === "cancelled" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setStatusFilter("cancelled");
                      setCurrentPage(1);
                    }}
                    className="h-9"
                  >
                    Cancelled
                  </Button>
                </div>
                <div className="relative flex-1 md:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search"
                    className="pl-10 w-full md:w-64"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {paginatedAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No appointments found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left w-16">#</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Patient</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Doctor</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Hospital</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Date & Time</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Fee</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Payment</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Status</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-slate-500">
                          #{appointment.id}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-slate-400" />
                            <div className="font-medium text-slate-900">{appointment.user_name}</div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Phone className="h-3 w-3 text-slate-400" />
                            {appointment.user_phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Stethoscope className="h-3 w-3 text-slate-400" />
                            <div className="font-medium text-slate-900">{appointment.doctor_name}</div>
                          </div>
                          <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200 font-medium text-xs">
                            {appointment.specialty}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-sm text-slate-700">
                          <Building2 className="h-3 w-3 text-slate-400" />
                          <span className="text-xs">{appointment.hospital_name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-slate-700">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3 text-slate-400" />
                            {appointment.time}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-slate-900">
                          QAR {appointment.consultation_fee}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={`${getPaymentStatusColor(appointment.payment_status)} font-medium`}>
                          {appointment.payment_status.charAt(0).toUpperCase() + appointment.payment_status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={`${getStatusColor(appointment.status)} font-medium`}>
                          {getStatusIcon(appointment.status)}
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
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
                                toggleDropdown(appointment.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>

                            {openDropdown === appointment.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  Edit Appointment
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  View Notes
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-rose-700 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100">
                                  <XCircle className="h-4 w-4" />
                                  Cancel Appointment
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
                {Math.min(startIndex + itemsPerPage, filteredAppointments.length)} of{" "}
                {filteredAppointments.length.toLocaleString()} appointments
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
