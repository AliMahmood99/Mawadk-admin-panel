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
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Bell,
  Send,
  TrendingUp,
  CheckCircle,
  Clock,
  Target
} from "lucide-react";
import { notifications } from "@/data/mock/notifications";

export default function NotificationsPage() {
  const t = useTranslations("notifications");
  const tCommon = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const itemsPerPage = 10;

  // Filter notifications based on search
  const filteredNotifications = notifications.filter(
    (notif) =>
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.title_ar.includes(searchQuery) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate analytics
  const totalSent = notifications.filter(n => n.sent_at !== null).length;
  const thisMonth = notifications.filter(n => {
    if (!n.sent_at) return false;
    const sentDate = new Date(n.sent_at);
    const now = new Date();
    return sentDate.getMonth() === now.getMonth() && sentDate.getFullYear() === now.getFullYear();
  }).length;
  const totalDelivered = notifications.reduce((sum, n) => sum + (n.delivered || 0), 0);
  const totalClicked = notifications.reduce((sum, n) => sum + (n.clicked || 0), 0);
  const avgClickRate = totalDelivered > 0 ? ((totalClicked / totalDelivered) * 100).toFixed(1) : 0;

  const toggleDropdown = (notifId) => {
    setOpenDropdown(openDropdown === notifId ? null : notifId);
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case "system": return t("system");
      case "marketing": return t("marketing");
      case "platform": return t("platform");
      case "custom": return t("custom");
      default: return type;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "system": return "bg-blue-100 text-blue-700 border-blue-200";
      case "marketing": return "bg-pink-100 text-pink-700 border-pink-200";
      case "platform": return "bg-purple-100 text-purple-700 border-purple-200";
      case "custom": return "bg-cyan-100 text-cyan-700 border-cyan-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getSentToLabel = (sentTo) => {
    switch(sentTo) {
      case "all_users": return t("allUsers");
      case "specific_users": return t("specificUsers");
      case "active_users": return t("activeUsers");
      case "parents": return t("parents");
      default: return sentTo;
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
          <Send className="w-4 h-4" />
          {t("sendNotification")}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalSent")}
              </CardTitle>
              <div className="h-10 w-10 bg-pink-50 rounded-lg flex items-center justify-center">
                <Send className="h-5 w-5 text-pink-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalSent.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("thisMonth")}
              </CardTitle>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {thisMonth.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              {totalSent > 0 ? Math.round((thisMonth / totalSent) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("delivered")}
              </CardTitle>
              <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalDelivered.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("clickRate")}
              </CardTitle>
              <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {avgClickRate}%
            </div>
            <p className="text-xs text-purple-600 mt-1">
              {totalClicked.toLocaleString()} clicks
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
                {tCommon("all")} ({filteredNotifications.length})
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
            {paginatedNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">{t("noNotifications")}</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("titleAndMessage")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      Type
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("sentTo")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {t("date")}
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">
                      {tCommon("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedNotifications.map((notif, index) => (
                    <tr
                      key={notif.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-all"
                    >
                      <td className="py-4 px-6">
                        <div className="max-w-xs">
                          <div className="font-medium text-slate-900 truncate">
                            {notif.title}
                          </div>
                          <div className="text-xs text-slate-500 truncate mt-1">
                            {notif.title_ar}
                          </div>
                          <div className="text-xs text-slate-400 truncate mt-1 line-clamp-2">
                            {notif.message}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant="outline"
                          className={getTypeColor(notif.type)}
                        >
                          {getTypeLabel(notif.type)}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-slate-700">
                          {getSentToLabel(notif.sent_to)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                          <Target className="h-3 w-3" />
                          {notif.target_count.toLocaleString()} users
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {notif.sent_at ? (
                          <>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 font-medium mb-2">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {t("sent")}
                            </Badge>
                            <div className="text-xs text-slate-600">
                              {new Date(notif.sent_at).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-slate-400">
                              {new Date(notif.sent_at).toLocaleTimeString()}
                            </div>
                          </>
                        ) : notif.scheduled_at ? (
                          <>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 font-medium mb-2">
                              <Clock className="h-3 w-3 mr-1" />
                              {t("scheduled")}
                            </Badge>
                            <div className="text-xs text-slate-600">
                              {new Date(notif.scheduled_at).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-slate-400">
                              {new Date(notif.scheduled_at).toLocaleTimeString()}
                            </div>
                          </>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200 font-medium">
                            Draft
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
                                toggleDropdown(notif.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>

                            {openDropdown === notif.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  {tCommon("view")}
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  {tCommon("edit")}
                                </button>
                                {!notif.sent_at && (
                                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100">
                                    <Send className="h-4 w-4" />
                                    Send Now
                                  </button>
                                )}
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
                {Math.min(startIndex + itemsPerPage, filteredNotifications.length)} of{" "}
                {filteredNotifications.length.toLocaleString()}
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
