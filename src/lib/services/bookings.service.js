import apiClient from "../api/client";

/**
 * Bookings Service - Manages appointment bookings
 * Handles listing, viewing details, and updating booking status
 */
const BookingsService = {
  /**
   * Booking Statuses (lowercase as returned from API)
   */
  STATUSES: {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
    NO_SHOW: "no_show",
  },

  /**
   * Payment Methods
   */
  PAYMENT_METHODS: {
    CASH: "cash",
    CARD: "card",
    ONLINE: "online",
  },

  /**
   * Status transitions - which statuses can transition to which
   */
  STATUS_TRANSITIONS: {
    pending: ["confirmed", "cancelled"],
    confirmed: ["completed", "cancelled", "no_show"],
    completed: [], // Final state
    cancelled: [], // Final state
    no_show: [], // Final state
  },

  /**
   * List Bookings with filtering and pagination
   * GET /bookings
   */
  getBookings: async (params = {}) => {
    try {
      const response = await apiClient.get("/bookings", { params });

      if (response.data?.status === "success") {
        const data = response.data.data;

        // Handle different response structures
        const items = Array.isArray(data) ? data : (data?.items || data?.data || []);

        // Extract meta from data.meta (API structure) or fallback to direct properties
        const apiMeta = data?.meta || {};
        const meta = {
          current_page: apiMeta.current_page || data?.current_page || params.page || 1,
          last_page: apiMeta.last_page || data?.last_page || Math.ceil((apiMeta.total || data?.total || items.length) / (params.per_page || 10)),
          total: apiMeta.total || data?.total || data?.count || items.length,
          per_page: apiMeta.per_page || data?.per_page || params.per_page || 10,
        };

        // Extract reports/stats if available
        const reports = data?.reports || null;

        return {
          success: true,
          data: items,
          meta,
          stats: reports,
          message: response.data.message,
        };
      }

      return {
        success: false,
        data: [],
        meta: { current_page: 1, last_page: 1, total: 0, per_page: 10 },
        stats: null,
        message: response.data?.message || "Failed to fetch bookings",
      };
    } catch (error) {
      console.error("[BookingsService] Get bookings error:", error);
      return {
        success: false,
        data: [],
        meta: { current_page: 1, last_page: 1, total: 0, per_page: 10 },
        stats: null,
        message: error.response?.data?.message || "Error fetching bookings",
      };
    }
  },

  /**
   * Get Booking Details with Timeline
   * GET /bookings/{id}
   */
  getBookingById: async (id) => {
    try {
      const response = await apiClient.get(`/bookings/${id}`);

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to fetch booking details",
      };
    } catch (error) {
      console.error("[BookingsService] Get booking by ID error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error fetching booking details",
      };
    }
  },

  /**
   * Update Booking Status
   * POST /bookings/{id}/update-status
   */
  updateBookingStatus: async (id, status, cancellation_reason_id = null) => {
    try {
      const payload = { status };

      if ((status === "cancelled" || status === "no_show") && cancellation_reason_id) {
        payload.cancellation_reason_id = cancellation_reason_id;
      }

      const response = await apiClient.post(`/bookings/${id}/update-status`, payload);

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Booking status updated successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to update booking status",
      };
    } catch (error) {
      console.error("[BookingsService] Update booking status error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error updating booking status",
      };
    }
  },

  /**
   * Get Cancellation Reasons
   */
  getCancellationReasons: async () => {
    try {
      const response = await apiClient.get("/drop-down-list/cancellation-reasons");

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data || [],
          message: response.data.message,
        };
      }

      return {
        success: true,
        data: [],
        message: "No cancellation reasons available",
      };
    } catch (error) {
      console.error("[BookingsService] Get cancellation reasons error:", error);
      return {
        success: true,
        data: [],
        message: "Error fetching cancellation reasons",
      };
    }
  },

  /**
   * Capitalize first letter of status
   */
  capitalizeStatus: (status) => {
    if (!status) return "-";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  },

  /**
   * Get status badge color (handles lowercase status from API)
   */
  getStatusBadgeColor: (status) => {
    const normalizedStatus = status?.toLowerCase();
    const colors = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      confirmed: "bg-blue-50 text-blue-700 border-blue-200",
      approved: "bg-blue-50 text-blue-700 border-blue-200",
      checkedin: "bg-indigo-50 text-indigo-700 border-indigo-200",
      inprogress: "bg-purple-50 text-purple-700 border-purple-200",
      completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      cancelled: "bg-rose-50 text-rose-700 border-rose-200",
      noshow: "bg-slate-50 text-slate-700 border-slate-200",
      no_show: "bg-slate-50 text-slate-700 border-slate-200",
      rescheduled: "bg-orange-50 text-orange-700 border-orange-200",
    };
    return colors[normalizedStatus] || "bg-slate-50 text-slate-700 border-slate-200";
  },

  /**
   * Get payment method badge color
   */
  getPaymentMethodBadgeColor: (method) => {
    const normalizedMethod = method?.toLowerCase();
    const colors = {
      cash: "bg-emerald-50 text-emerald-700 border-emerald-200",
      card: "bg-blue-50 text-blue-700 border-blue-200",
      online: "bg-purple-50 text-purple-700 border-purple-200",
      pending: "bg-amber-50 text-amber-700 border-amber-200",
    };
    return colors[normalizedMethod] || "bg-slate-50 text-slate-700 border-slate-200";
  },

  /**
   * Get allowed transitions for a status
   */
  getAllowedTransitions: (currentStatus) => {
    const normalizedStatus = currentStatus?.toLowerCase();
    return BookingsService.STATUS_TRANSITIONS[normalizedStatus] || [];
  },

  /**
   * Format date for display
   */
  formatDate: (date, locale = "en") => {
    if (!date) return "-";
    try {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", options);
    } catch {
      return date;
    }
  },

  /**
   * Format time for display (handles "12:00 AM" format)
   */
  formatTime: (time) => {
    if (!time) return "-";
    // If already in AM/PM format, return as is
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }
    // Convert 24h to 12h format
    try {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  },

  /**
   * Format currency
   */
  formatCurrency: (amount, currency = "QAR") => {
    if (amount === null || amount === undefined || amount === "") return "-";
    const num = parseFloat(amount);
    if (isNaN(num)) return "-";
    return `${currency} ${num.toLocaleString()}`;
  },
};

export default BookingsService;
