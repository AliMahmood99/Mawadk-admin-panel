"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  HelpCircle,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  List,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import SettingsService from "@/lib/services/settings.service";

export default function FaqsListPage() {
  const t = useTranslations("faqs");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingFaq, setViewingFaq] = useState(null);

  const perPage = 10;

  const fetchFaqs = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        per_page: perPage,
      };
      if (searchQuery) {
        params.search = searchQuery;
      }
      const response = await SettingsService.getFaqs(params);
      if (response.success) {
        setFaqs(response.data?.data || []);
        setTotalPages(response.data?.last_page || 1);
        setTotalItems(response.data?.total || 0);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast.error(t("fetchError") || "Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, t]);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (faq) => {
    setFaqToDelete(faq);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!faqToDelete) return;
    try {
      setDeleting(true);
      const response = await SettingsService.deleteFaq(faqToDelete.id);
      if (response.success) {
        toast.success(t("deleteSuccess") || "FAQ deleted successfully");
        fetchFaqs();
      } else {
        toast.error(response.message || t("deleteError") || "Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error(t("deleteError") || "Failed to delete FAQ");
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setFaqToDelete(null);
    }
  };

  const handleView = (faq) => {
    setViewingFaq(faq);
    setViewDialogOpen(true);
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  // Stats
  const activeFaqs = faqs.filter((f) => f.is_active).length;
  const inactiveFaqs = faqs.filter((f) => !f.is_active).length;

  return (
    <DashboardLayout requiredUserType="admin">
      <Toaster position="top-center" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href={`/${locale}/admin/users`} className="hover:text-foreground transition-colors">
          {tCommon("home") || "Home"}
        </Link>
        <ArrowIcon className="w-4 h-4" />
        <span className="text-foreground font-medium">{t("title")}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
        </div>
        <Link href={`/${locale}/admin/settings/faqs/add`}>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            {t("addFaq")}
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("totalFaqs")}</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <List className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("activeFaqs")}</p>
                <p className="text-2xl font-bold text-green-600">{activeFaqs}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("inactiveFaqs")}</p>
                <p className="text-2xl font-bold text-red-600">{inactiveFaqs}</p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={handleSearch}
              placeholder={t("searchPlaceholder") || "Search FAQs..."}
              className="ps-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQs List */}
      <Card>
        <CardHeader>
          <CardTitle>{t("faqsList")}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? t("noSearchResults") : t("noFaqs")}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-start p-3 font-medium text-muted-foreground">#</th>
                      <th className="text-start p-3 font-medium text-muted-foreground">
                        {t("question")}
                      </th>
                      <th className="text-start p-3 font-medium text-muted-foreground">
                        {t("order")}
                      </th>
                      <th className="text-start p-3 font-medium text-muted-foreground">
                        {t("status")}
                      </th>
                      <th className="text-start p-3 font-medium text-muted-foreground">
                        {t("actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {faqs.map((faq, index) => (
                      <tr key={faq.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3">{(currentPage - 1) * perPage + index + 1}</td>
                        <td className="p-3">
                          <p className="font-medium line-clamp-2">
                            {locale === "ar" ? faq.question_ar : faq.question_en}
                          </p>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">{faq.order || 0}</Badge>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant={faq.is_active ? "default" : "secondary"}
                            className={
                              faq.is_active
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-red-100 text-red-700 hover:bg-red-100"
                            }
                          >
                            {faq.is_active ? t("active") : t("inactive")}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleView(faq)}
                              title={t("view")}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Link href={`/${locale}/admin/settings/faqs/edit/${faq.id}`}>
                              <Button variant="ghost" size="icon" title={t("edit")}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(faq)}
                              title={t("delete")}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {t("showing")} {(currentPage - 1) * perPage + 1} -{" "}
                    {Math.min(currentPage * perPage, totalItems)} {t("of")} {totalItems}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      <PrevIcon className="w-4 h-4" />
                    </Button>
                    <span className="text-sm">
                      {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      <NextIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <AlertDialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("viewFaq")}</AlertDialogTitle>
          </AlertDialogHeader>
          {viewingFaq && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">
                  {t("questionEn")}
                </h4>
                <p className="font-medium">{viewingFaq.question_en}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">
                  {t("questionAr")}
                </h4>
                <p className="font-medium" dir="rtl">
                  {viewingFaq.question_ar}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">{t("answerEn")}</h4>
                <div
                  className="prose prose-sm max-w-none bg-muted/30 p-3 rounded-md"
                  dangerouslySetInnerHTML={{ __html: viewingFaq.answer_en }}
                />
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">{t("answerAr")}</h4>
                <div
                  className="prose prose-sm max-w-none bg-muted/30 p-3 rounded-md"
                  dir="rtl"
                  dangerouslySetInnerHTML={{ __html: viewingFaq.answer_ar }}
                />
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>{tCommon("close")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("deleteConfirmMessage")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>{tCommon("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin me-2" />
                  {t("deleting")}
                </>
              ) : (
                t("delete")
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
