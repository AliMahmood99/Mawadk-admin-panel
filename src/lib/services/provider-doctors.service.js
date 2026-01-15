import apiClient from "../api/client";

/**
 * Provider Doctors Service - Handles doctors inside Hospitals/Clinics
 * These are different from standalone Doctor providers
 * Base URL: /dashboard (already in API_BASE_URL)
 */
const ProviderDoctorsService = {
  /**
   * List Provider Doctors with filtering and pagination
   * GET /provider-doctors
   * @param {Object} params - Query parameters
   * @param {number} params.provider_id - Required: Filter by provider (Hospital/Clinic)
   * @param {string} params.search - Search in name, description
   * @param {string} params.status - Filter by status (active, inactive)
   * @param {string} params.from_registration_at - Registration date from
   * @param {string} params.to_registration_at - Registration date to
   * @param {number} params.per_page - Items per page (default: 10)
   * @param {number} params.page - Page number
   * @returns {Promise} - { items, meta, reports }
   */
  getProviderDoctors: async (params = {}) => {
    try {
      const response = await apiClient.get("/provider-doctors", { params });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data?.items || [],
          meta: response.data.data?.meta || { current_page: 1, last_page: 1, total: 0 },
          reports: response.data.data?.reports || {},
          message: response.data.message,
        };
      }

      return {
        success: false,
        data: [],
        meta: { current_page: 1, last_page: 1, total: 0 },
        reports: {},
        message: response.data?.message || "Failed to fetch provider doctors",
      };
    } catch (error) {
      console.error("[ProviderDoctorsService] Get provider doctors error:", error);
      return {
        success: false,
        data: [],
        meta: { current_page: 1, last_page: 1, total: 0 },
        reports: {},
        message: error.response?.data?.message || "Error fetching provider doctors",
      };
    }
  },

  /**
   * Get Provider Doctor Details
   * GET /provider-doctors/{id}
   * @param {number} id - Provider Doctor ID
   * @returns {Promise} - Doctor details with translations
   */
  getProviderDoctorById: async (id) => {
    try {
      const response = await apiClient.get(`/provider-doctors/${id}`);

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
        message: response.data?.message || "Failed to fetch doctor details",
      };
    } catch (error) {
      console.error("[ProviderDoctorsService] Get doctor by ID error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error fetching doctor details",
      };
    }
  },

  /**
   * Create Provider Doctor
   * POST /provider-doctors
   * @param {FormData} formData - Doctor data including translations and schedules
   * @returns {Promise}
   */
  createProviderDoctor: async (formData) => {
    try {
      const response = await apiClient.post("/provider-doctors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Doctor created successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to create doctor",
      };
    } catch (error) {
      console.error("[ProviderDoctorsService] Create doctor error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error creating doctor",
      };
    }
  },

  /**
   * Update Provider Doctor
   * POST /provider-doctors/{id}
   * @param {number} id - Doctor ID
   * @param {FormData} formData - Updated doctor data
   * @returns {Promise}
   */
  updateProviderDoctor: async (id, formData) => {
    try {
      const response = await apiClient.post(`/provider-doctors/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Doctor updated successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to update doctor",
      };
    } catch (error) {
      console.error("[ProviderDoctorsService] Update doctor error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error updating doctor",
      };
    }
  },

  /**
   * Toggle Provider Doctor Status
   * POST /provider-doctors/update-status/{id}
   * @param {number} id - Doctor ID
   * @returns {Promise}
   */
  toggleDoctorStatus: async (id) => {
    try {
      const response = await apiClient.post(`/provider-doctors/update-status/${id}`);

      if (response.data?.status === "success") {
        return {
          success: true,
          message: response.data.message || "Doctor status updated successfully",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Failed to update doctor status",
      };
    } catch (error) {
      console.error("[ProviderDoctorsService] Toggle doctor status error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error updating doctor status",
      };
    }
  },

  /**
   * Build FormData for create/update
   * @param {Object} data - Doctor data
   * @returns {FormData}
   */
  buildFormData: (data) => {
    const formData = new FormData();

    // Basic fields
    if (data.provider_id) formData.append("provider_id", data.provider_id);
    if (data.category_id) formData.append("category_id", data.category_id);
    formData.append("is_active", data.is_active ? "1" : "0");
    if (data.experience_years !== undefined) formData.append("experience_years", data.experience_years);

    // Pricing
    if (data.price_before_discount !== undefined) formData.append("price_before_discount", data.price_before_discount);
    if (data.price_after_discount !== undefined) formData.append("price_after_discount", data.price_after_discount);
    if (data.discount_percentage !== undefined) formData.append("discount_percentage", data.discount_percentage);

    // Arabic translations
    if (data.ar_name) formData.append("ar[name]", data.ar_name);
    if (data.ar_short_description) formData.append("ar[short_description]", data.ar_short_description);

    // English translations
    if (data.en_name) formData.append("en[name]", data.en_name);
    if (data.en_short_description) formData.append("en[short_description]", data.en_short_description);

    // Working schedules (7 days)
    if (data.schedules && Array.isArray(data.schedules)) {
      data.schedules.forEach((schedule, index) => {
        formData.append(`schedules[${index}][day_of_week]`, schedule.day_of_week);
        formData.append(`schedules[${index}][open_time]`, schedule.open_time);
        formData.append(`schedules[${index}][close_time]`, schedule.close_time);
      });
    }

    // Image (optional)
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    return formData;
  },

  /**
   * Get default schedule (7 days, 8am-5pm)
   * @returns {Array}
   */
  getDefaultSchedule: () => {
    return Array.from({ length: 7 }, (_, i) => ({
      day_of_week: i,
      open_time: "08:00",
      close_time: "17:00",
    }));
  },

  /**
   * Get day name by index
   * @param {number} dayIndex - 0-6
   * @param {string} locale - 'ar' or 'en'
   * @returns {string}
   */
  getDayName: (dayIndex, locale = "ar") => {
    const days = {
      ar: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    };
    return days[locale]?.[dayIndex] || days.ar[dayIndex];
  },

  /**
   * Get Categories Dropdown for Provider Doctors
   * GET /categories or /dropdown/categories
   * @returns {Promise} - Array of categories for select
   */
  getCategoriesDropdown: async () => {
    try {
      // Try multiple possible endpoints
      const endpoints = [
        "/categories",
        "/drop-down-list/categories",
        "/dropdown/categories",
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await apiClient.get(endpoint);
          if (response.data?.status === "success" && response.data.data) {
            // Handle both array and object with items
            const data = Array.isArray(response.data.data)
              ? response.data.data
              : response.data.data.items || [];
            return {
              success: true,
              data: data,
              message: response.data.message,
            };
          }
        } catch (e) {
          // Try next endpoint
          continue;
        }
      }

      // If no endpoint works, return empty with success to avoid crashes
      return {
        success: true,
        data: [],
        message: "Categories endpoint not available",
      };
    } catch (error) {
      console.error("[ProviderDoctorsService] Get categories dropdown error:", error);
      return {
        success: true,
        data: [],
        message: error.response?.data?.message || "Error fetching categories",
      };
    }
  },
};

export default ProviderDoctorsService;
