"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Loader2,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  FolderTree,
  Users,
  Stethoscope,
  Calendar,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CategoriesService from "@/lib/services/categories.service";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const t = useTranslations("categories");
  const tc = useTranslations("common");
  const router = useRouter();
  const { locale } = useParams();

  // State
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [reports, setReports] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 10;

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (statusFilter !== "all") {
        params.status = statusFilter === "active" ? 1 : 0;
      }

      const result = await CategoriesService.getCategories(params);

      if (result.success) {
        setCategories(result.data);
        setMeta(result.meta);
        setReports(result.reports);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error(t("fetchError"));
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, statusFilter, t]);

  // Initial fetch
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers
  const handleAddCategory = () => {
    router.push(`/${locale}/admin/settings/categories/add`);
  };

  const handleEditCategory = (category) => {
    setOpenDropdown(null);
    router.push(`/${locale}/admin/settings/categories/edit/${category.id}`);
  };

  const handleToggleStatus = async (categoryId) => {
    setOpenDropdown(null);
    const loadingToast = toast.loading(t("updatingStatus"));
    try {
      const result = await CategoriesService.toggleCategoryStatus(categoryId);
      toast.dismiss(loadingToast);
      if (result.success) {
        toast.success(result.message);
        fetchCategories();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t("statusError"));
    }
  };

  const handleDeleteClick = (category) => {
    setOpenDropdown(null);
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    try {
      const result = await CategoriesService.deleteCategory(categoryToDelete.id);
      if (result.success) {
        toast.success(result.message);
        setIsDeleteModalOpen(false);
        setCategoryToDelete(null);
        fetchCategories();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(t("deleteError"));
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleDropdown = (categoryId) => {
    setOpenDropdown(openDropdown === categoryId ? null : categoryId);
  };

  // Pagination
  const totalPages = meta.last_page || 1;
  const pages = Array.from({ length: Math.min(totalPages, 6) }, (_, i) => i + 1);

  return (
    <DashboardLayout requiredUserType="admin">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-500 mt-1">{t("subtitle")}</p>
        </div>
        <Button onClick={handleAddCategory} className="gap-2 h-10">
          <Plus className="w-4 h-4" />
          {t("addCategory")}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalCategories")}
              </CardTitle>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FolderTree className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : reports.total || 0}
            </div>
            <p className="text-xs text-slate-500 mt-1">{t("allCategories")}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("activeCategories")}
              </CardTitle>
              <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : reports.active || 0}
            </div>
            <p className="text-xs text-emerald-600 mt-1">{t("activeDesc")}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("inactiveCategories")}
              </CardTitle>
              <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <XCircle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : reports.inactive || 0}
            </div>
            <p className="text-xs text-amber-600 mt-1">{t("inactiveDesc")}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t("totalBookings")}
              </CardTitle>
              <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                reports.bookings_count || 0
              )}
            </div>
            <p className="text-xs text-purple-600 mt-1">{t("bookingsDesc")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Status Filter Tabs */}
                <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
                  <button
                    onClick={() => {
                      setStatusFilter("all");
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      statusFilter === "all"
                        ? "bg-primary text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tc("all")}
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("active");
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      statusFilter === "active"
                        ? "bg-emerald-500 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t("active")}
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("inactive");
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      statusFilter === "inactive"
                        ? "bg-amber-500 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t("inactive")}
                  </button>
                </div>
                <Badge variant="secondary" className="bg-slate-200 text-slate-700">
                  {meta.total || 0}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fetchCategories}
                  disabled={isLoading}
                  className="h-8 w-8 p-0"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder={t("searchPlaceholder")}
                    className="ps-10 w-72 h-10 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-visible">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-slate-500">{t("loading")}</p>
                </div>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-16">
                <FolderTree className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">{t("noCategories")}</h3>
                <p className="text-slate-500">{t("noCategoriesDesc")}</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="py-3.5 px-6 text-sm font-semibold text-slate-600 text-start w-16">
                      #
                    </th>
                    <th className="py-3.5 px-6 text-sm font-semibold text-slate-600 text-start">
                      {t("category")}
                    </th>
                    <th className="py-3.5 px-6 text-sm font-semibold text-slate-600 text-start">
                      {t("providers")}
                    </th>
                    <th className="py-3.5 px-6 text-sm font-semibold text-slate-600 text-start">
                      {t("doctors")}
                    </th>
                    <th className="py-3.5 px-6 text-sm font-semibold text-slate-600 text-start">
                      {t("bookings")}
                    </th>
                    <th className="py-3.5 px-6 text-sm font-semibold text-slate-600 text-start">
                      {t("sort")}
                    </th>
                    <th className="py-3.5 px-6 text-sm font-semibold text-slate-600 text-start">
                      {t("status")}
                    </th>
                    <th className="py-3.5 px-6 text-sm font-semibold text-slate-600 text-start w-20">
                      {tc("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr
                      key={category.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span className="text-sm text-slate-500 font-medium">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-10 w-10 rounded-lg object-cover bg-slate-100"
                            />
                          ) : (
                            <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                              <ImageIcon className="h-5 w-5 text-slate-400" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-slate-900">{category.name}</div>
                            <div className="text-xs text-slate-500">{category.created_at}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-slate-700">
                            {category.providers_count || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          <Stethoscope className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm font-medium text-slate-700">
                            {category.provider_doctors_count || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-purple-500" />
                          <span className="text-sm font-medium text-slate-700">
                            {category.bookings_count || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="outline" className="text-slate-600">
                          {category.sort}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        {category.status ? (
                          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 gap-1">
                            <CheckCircle className="h-3 w-3" />
                            {t("active")}
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-200 gap-1">
                            <XCircle className="h-3 w-3" />
                            {t("inactive")}
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center">
                          <div
                            className="relative"
                            ref={openDropdown === category.id ? dropdownRef : null}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-slate-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(category.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4 text-slate-500" />
                            </Button>

                            {openDropdown === category.id && (
                              <div
                                className="absolute end-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  className="w-full px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                                  onClick={() => handleEditCategory(category)}
                                >
                                  <Edit3 className="h-4 w-4 text-slate-400" />
                                  {t("editCategory")}
                                </button>
                                <button
                                  className="w-full px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                                  onClick={() => handleToggleStatus(category.id)}
                                >
                                  {category.status ? (
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
                                </button>
                                <div className="border-t border-slate-100 my-1" />
                                <button
                                  className="w-full px-3 py-2 text-start text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                                  onClick={() => handleDeleteClick(category)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  {t("deleteCategory")}
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
          {!isLoading && categories.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  {t("showing")} {(currentPage - 1) * itemsPerPage + 1} {t("to")}{" "}
                  {Math.min(currentPage * itemsPerPage, meta.total || 0)} {t("of")}{" "}
                  {meta.total || 0} {t("categories")}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {tc("previous")}
                  </Button>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8"
                  >
                    {tc("next")}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t("deleteTitle")}</h3>
              <p className="text-slate-600 mb-6">
                {t("deleteConfirm")} <strong>{categoryToDelete?.name}</strong>?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setCategoryToDelete(null);
                  }}
                >
                  {tc("cancel")}
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 gap-2"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  {t("delete")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
