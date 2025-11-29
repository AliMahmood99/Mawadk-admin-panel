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
  Star,
  User,
  Stethoscope,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
  AlertCircle,
  Calendar
} from "lucide-react";
import { reviews } from "@/data/mock/reviews";

export default function ReviewsPage() {
  const t = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [ratingFilter, setRatingFilter] = useState("all");
  const itemsPerPage = 10;

  // Filter reviews based on search and rating
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.doctor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "5" && review.rating === 5) ||
      (ratingFilter === "4" && review.rating === 4) ||
      (ratingFilter === "3" && review.rating <= 3);

    return matchesSearch && matchesRating;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate analytics
  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const fiveStarReviews = reviews.filter(r => r.rating === 5).length;
  const fourStarReviews = reviews.filter(r => r.rating === 4).length;

  const toggleDropdown = (reviewId) => {
    setOpenDropdown(openDropdown === reviewId ? null : reviewId);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-amber-500 text-amber-500"
                : "text-slate-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingColor = (rating) => {
    if (rating === 5) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (rating === 4) return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-amber-100 text-amber-700 border-amber-200";
  };

  return (
    <DashboardLayout requiredUserType="admin">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reviews & Ratings</h1>
          <p className="text-slate-600 mt-1">Manage all patient reviews and feedback</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Total Reviews</CardTitle>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalReviews.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">All patient feedback</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Average Rating</CardTitle>
              <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-amber-600 fill-amber-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{avgRating}</div>
            <p className="text-xs text-slate-500 mt-1">Out of 5 stars</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">5-Star Reviews</CardTitle>
              <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <ThumbsUp className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{fiveStarReviews.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 mt-1">
              {Math.round((fiveStarReviews / totalReviews) * 100)}% of all reviews
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Satisfaction Rate</CardTitle>
              <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {Math.round(((fiveStarReviews + fourStarReviews) / totalReviews) * 100)}%
            </div>
            <p className="text-xs text-slate-500 mt-1">4+ star ratings</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card className="border-slate-200">
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">All Reviews ({filteredReviews.length})</h3>
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Rating Filter */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={ratingFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setRatingFilter("all");
                      setCurrentPage(1);
                    }}
                    className="h-9"
                  >
                    All
                  </Button>
                  <Button
                    variant={ratingFilter === "5" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setRatingFilter("5");
                      setCurrentPage(1);
                    }}
                    className="h-9 gap-1"
                  >
                    <Star className="w-3 h-3 fill-current" />
                    5
                  </Button>
                  <Button
                    variant={ratingFilter === "4" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setRatingFilter("4");
                      setCurrentPage(1);
                    }}
                    className="h-9 gap-1"
                  >
                    <Star className="w-3 h-3 fill-current" />
                    4
                  </Button>
                  <Button
                    variant={ratingFilter === "3" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setRatingFilter("3");
                      setCurrentPage(1);
                    }}
                    className="h-9 gap-1"
                  >
                    <Star className="w-3 h-3 fill-current" />
                    ≤3
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
            {paginatedReviews.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No reviews found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left w-16">#</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Patient</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Doctor</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Rating</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Review</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Date</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReviews.map((review) => (
                    <tr
                      key={review.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-slate-500">
                          #{review.id}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{review.user_name}</div>
                            <div className="text-xs text-slate-500">{review.user_name_ar}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-3 w-3 text-slate-400" />
                          <div>
                            <div className="font-medium text-slate-900">{review.doctor_name}</div>
                            <div className="text-xs text-slate-500">{review.doctor_name_ar}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-2">
                          {renderStars(review.rating)}
                          <Badge className={`${getRatingColor(review.rating)} font-medium`}>
                            {review.rating}.0
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="max-w-md">
                          <p className="text-sm text-slate-700 line-clamp-2">
                            "{review.comment}"
                          </p>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                            {review.comment_ar}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-sm text-slate-700">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          {new Date(review.created_at).toLocaleDateString()}
                        </div>
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
                                toggleDropdown(review.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>

                            {openDropdown === review.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  View Full Review
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  Edit Review
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4" />
                                  Flag as Inappropriate
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-rose-700 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100">
                                  <Trash2 className="h-4 w-4" />
                                  Delete Review
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
                {Math.min(startIndex + itemsPerPage, filteredReviews.length)} of{" "}
                {filteredReviews.length.toLocaleString()} reviews
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
