import { toast } from "sonner";

/**
 * Notification Helper Functions
 * استخدم هذه الدوال لعرض الإشعارات في التطبيق
 */

export const notify = {
  // Success notification
  success: (title, description) => {
    toast.success(title, {
      description: description,
      duration: 3000,
    });
  },

  // Error notification
  error: (title, description) => {
    toast.error(title, {
      description: description,
      duration: 4000,
    });
  },

  // Warning notification
  warning: (title, description) => {
    toast.warning(title, {
      description: description,
      duration: 3500,
    });
  },

  // Info notification
  info: (title, description) => {
    toast.info(title, {
      description: description,
      duration: 3000,
    });
  },

  // Custom notification with action button
  custom: (title, description, actionLabel, actionFn) => {
    toast(title, {
      description: description,
      duration: 4000,
      action: {
        label: actionLabel,
        onClick: actionFn,
      },
    });
  },

  // Promise notification (for async operations)
  promise: (promise, messages) => {
    toast.promise(promise, {
      loading: messages.loading || "جاري التحميل...",
      success: messages.success || "تم بنجاح!",
      error: messages.error || "حدث خطأ!",
    });
  },

  // Appointment notification
  appointment: (doctorName, time, action) => {
    toast("موعد جديد!", {
      description: `لديك موعد مع ${doctorName} في الساعة ${time}`,
      duration: 5000,
      action: {
        label: "عرض",
        onClick: action,
      },
    });
  },

  // Payment notification
  payment: (amount, status) => {
    if (status === "success") {
      toast.success("تم الدفع بنجاح!", {
        description: `تم دفع ${amount} ريال قطري`,
        duration: 4000,
      });
    } else {
      toast.error("فشل الدفع!", {
        description: "حاول مرة أخرى",
        duration: 4000,
      });
    }
  },

  // Booking confirmation
  bookingConfirmed: (doctorName, date, time) => {
    toast.success("تم تأكيد الحجز!", {
      description: `موعدك مع ${doctorName} يوم ${date} الساعة ${time}`,
      duration: 5000,
    });
  },

  // Booking cancelled
  bookingCancelled: (reason) => {
    toast.error("تم إلغاء الحجز", {
      description: reason || "تم إلغاء موعدك",
      duration: 4000,
    });
  },

  // Review submitted
  reviewSubmitted: () => {
    toast.success("شكراً لتقييمك!", {
      description: "تم إرسال تقييمك بنجاح",
      duration: 3000,
    });
  },

  // Profile updated
  profileUpdated: () => {
    toast.success("تم التحديث!", {
      description: "تم تحديث بياناتك بنجاح",
      duration: 3000,
    });
  },

  // Validation error
  validationError: (field) => {
    toast.error("خطأ في البيانات!", {
      description: `يرجى التحقق من ${field}`,
      duration: 3000,
    });
  },

  // Network error
  networkError: () => {
    toast.error("خطأ في الاتصال!", {
      description: "تحقق من اتصالك بالإنترنت",
      duration: 4000,
    });
  },
};

export default notify;
