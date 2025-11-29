"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Calendar,
  Search,
  Download,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { appointments } from "@/data/mock/appointments";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DoctorEarningsPage() {
  const t = useTranslations("doctor.earnings");
  const tCommon = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter appointments for doctor_id = 1
  const doctorAppointments = appointments.filter((apt) => apt.doctor_id === 1);

  // Calculate earnings
  const totalEarnings = doctorAppointments.reduce(
    (sum, apt) => sum + apt.consultation_fee,
    0
  );

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthEarnings = doctorAppointments
    .filter((apt) => {
      const aptDate = new Date(apt.date);
      return (
        aptDate.getMonth() === thisMonth && aptDate.getFullYear() === thisYear
      );
    })
    .reduce((sum, apt) => sum + apt.consultation_fee, 0);

  const pendingEarnings = doctorAppointments
    .filter((apt) => apt.status === "upcoming")
    .reduce((sum, apt) => sum + apt.consultation_fee, 0);

  const completedEarnings = doctorAppointments
    .filter((apt) => apt.status === "completed")
    .reduce((sum, apt) => sum + apt.consultation_fee, 0);

  // Monthly earnings data for chart
  const monthlyData = [
    { month: "Jan", earnings: 35000 },
    { month: "Feb", earnings: 42000 },
    { month: "Mar", earnings: 38000 },
    { month: "Apr", earnings: 45000 },
    { month: "May", earnings: 48000 },
    { month: "Jun", earnings: thisMonthEarnings },
  ];

  // Filter by search query
  const filteredTransactions = doctorAppointments.filter(
    (apt) =>
      apt.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.hospital_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-slate-200">
          <p className="text-sm font-semibold text-slate-900">
            {payload[0].payload.month}
          </p>
          <p className="text-sm text-secondary">
            Earnings: QAR {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout requiredUserType="doctor">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
            <p className="text-slate-600 mt-1">{t("subtitle")}</p>
          </div>
          <Button className="gap-2 bg-secondary hover:bg-secondary/90">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 border-l-4 border-l-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("totalEarnings")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  QAR {totalEarnings.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1">All time</p>
              </div>
              <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("thisMonth")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  QAR {thisMonthEarnings.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                  <span className="text-xs text-emerald-600 font-medium">
                    +12.5%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  QAR {completedEarnings.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1">Withdrawn</p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("pending")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  QAR {pendingEarnings.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1">Upcoming</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Earnings Overview
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Monthly earnings for the last 6 months
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: "12px" }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#EC4899"
                  strokeWidth={3}
                  dot={{ fill: "#EC4899", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">
                Recent Transactions ({filteredTransactions.length})
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
            {paginatedTransactions.length === 0 ? (
              <div className="text-center py-12">
                <Wallet className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">
                  {t("noTransactions")}
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
                      {t("patient")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("appointmentType")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("date")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("amount")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {tCommon("status")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((apt) => (
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
                        <div>
                          <p className="font-medium text-slate-900">
                            {apt.user_name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {apt.hospital_name}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-700">{apt.specialty}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">
                            {apt.date}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-secondary text-lg">
                          QAR {apt.consultation_fee}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          className={
                            apt.status === "completed"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : apt.status === "upcoming"
                              ? "bg-orange-100 text-orange-700 border-orange-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }
                        >
                          {apt.status === "completed"
                            ? "Paid"
                            : apt.status === "upcoming"
                            ? "Pending"
                            : "Cancelled"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {filteredTransactions.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredTransactions.length)} of{" "}
                {filteredTransactions.length}
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
