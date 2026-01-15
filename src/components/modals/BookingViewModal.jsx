"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BookingsService from "@/lib/services/bookings.service";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Stethoscope,
  Building2,
  CreditCard,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
  MessageSquare,
  Bell,
  CheckCircle,
  XCircle,
  Activity,
  UserCheck,
  UserX,
  CheckCircle2,
  MapPin,
} from "lucide-react";

// Status icon mapping
const StatusIcons = {
  Pending: Clock,
  Approved: CheckCircle,
  CheckedIn: UserCheck,
  InProgress: Activity,
  Completed: CheckCircle2,
  Cancelled: XCircle,
  NoShow: UserX,
  Rescheduled: RefreshCw,
};

// Timeline event icon mapping
const TimelineIcons = {
  created: Plus,
  status_changed: RefreshCw,
  payment_received: CreditCard,
  note_added: MessageSquare,
  reminder_sent: Bell,
};

export default function BookingViewModal({ open, onClose, bookingId }) {
  const t = useTranslations("bookings");
  const tCommon = useTranslations("common");
  const { locale } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && bookingId) {
      fetchBookingDetails();
    }
  }, [open, bookingId]);

  const fetchBookingDetails = async () => {
    setLoading(true);
    const result = await BookingsService.getBookingById(bookingId);
    if (result.success) {
      setBooking(result.data);
    }
    setLoading(false);
  };

  const getStatusIcon = (status) => {
    const Icon = StatusIcons[status] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const getTimelineIcon = (eventType) => {
    const Icon = TimelineIcons[eventType] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {t("bookingDetails") || "Booking Details"}
            {booking && (
              <Badge variant="outline" className="ms-2">
                #{booking.id}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {t("viewBookingInfo") || "View complete booking information and timeline"}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : booking ? (
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <Badge
                className={`${BookingsService.getStatusBadgeColor(booking.status)} px-3 py-1 text-sm`}
              >
                {getStatusIcon(booking.status)}
                <span className="ms-1.5">{t(booking.status?.toLowerCase()) || booking.status}</span>
              </Badge>
              <Badge
                className={`${BookingsService.getPaymentStatusBadgeColor(booking.payment_status)} px-3 py-1 text-sm`}
              >
                <CreditCard className="h-4 w-4 me-1.5" />
                {t(booking.payment_status?.toLowerCase()) || booking.payment_status}
              </Badge>
            </div>

            <Separator />

            {/* Customer Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <User className="h-4 w-4 text-slate-500" />
                {t("customerInfo") || "Customer Information"}
              </h4>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">{t("name") || "Name"}</p>
                  <p className="font-medium text-slate-900">{booking.customer?.name || "-"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">{t("phone") || "Phone"}</p>
                  <p className="font-medium text-slate-900 flex items-center gap-1">
                    <Phone className="h-3 w-3 text-slate-400" />
                    {booking.customer?.phone || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">{t("email") || "Email"}</p>
                  <p className="font-medium text-slate-900 flex items-center gap-1">
                    <Mail className="h-3 w-3 text-slate-400" />
                    {booking.customer?.email || "-"}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Appointment Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                {t("appointmentInfo") || "Appointment Information"}
              </h4>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">{t("date") || "Date"}</p>
                  <p className="font-medium text-slate-900">
                    {BookingsService.formatDate(booking.booking_date, locale)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">{t("time") || "Time"}</p>
                  <p className="font-medium text-slate-900 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    {BookingsService.formatTime(booking.start_time)}
                    {booking.end_time && ` - ${BookingsService.formatTime(booking.end_time)}`}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">{t("duration") || "Duration"}</p>
                  <p className="font-medium text-slate-900">
                    {BookingsService.calculateDuration(booking.start_time, booking.end_time)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">{t("type") || "Type"}</p>
                  <p className="font-medium text-slate-900">{booking.type || "-"}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Doctor & Provider Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-slate-500" />
                  {t("doctor") || "Doctor"}
                </h4>
                <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                  <p className="font-medium text-slate-900">{booking.doctor?.name || "-"}</p>
                  {booking.doctor?.specialty && (
                    <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                      {booking.doctor.specialty}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-500" />
                  {t("provider") || "Provider"}
                </h4>
                <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                  <p className="font-medium text-slate-900">{booking.provider?.name || "-"}</p>
                  {booking.provider?.address && (
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {booking.provider.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-slate-500" />
                {t("paymentInfo") || "Payment Information"}
              </h4>
              <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">{t("consultationFee") || "Consultation Fee"}</p>
                  <p className="font-medium text-slate-900">
                    {BookingsService.formatCurrency(booking.consultation_fee, booking.currency)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">{t("discount") || "Discount"}</p>
                  <p className="font-medium text-slate-900">
                    {BookingsService.formatCurrency(booking.discount_amount, booking.currency)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">{t("total") || "Total"}</p>
                  <p className="font-bold text-lg text-primary">
                    {BookingsService.formatCurrency(booking.total_amount, booking.currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {booking.notes && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-500" />
                    {t("notes") || "Notes"}
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-700">{booking.notes}</p>
                  </div>
                </div>
              </>
            )}

            {/* Cancellation Reason */}
            {booking.cancellation_reason && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-semibold text-rose-700 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    {t("cancellationReason") || "Cancellation Reason"}
                  </h4>
                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                    <p className="text-sm text-rose-700">{booking.cancellation_reason}</p>
                  </div>
                </div>
              </>
            )}

            {/* Timeline */}
            {booking.timeline && booking.timeline.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-500" />
                    {t("timeline") || "Timeline"}
                  </h4>
                  <div className="space-y-4">
                    {booking.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${BookingsService.getTimelineEventColor(
                            event.type
                          )} text-white`}
                        >
                          {getTimelineIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900">{event.title}</p>
                          {event.description && (
                            <p className="text-sm text-slate-500">{event.description}</p>
                          )}
                          <p className="text-xs text-slate-400 mt-1">
                            {BookingsService.formatDate(event.created_at, locale)}{" "}
                            {event.created_at?.split(" ")[1] &&
                              BookingsService.formatTime(event.created_at.split(" ")[1])}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">{t("bookingNotFound") || "Booking not found"}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
