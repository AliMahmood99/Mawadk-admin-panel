import apiClient from "../api/client";

/**
 * Sliders Service - Manages promotional banners in the mobile app
 * Sliders can link to Hospitals, Clinics, Doctors, external URLs, or be display-only
 */
const SlidersService = {
  /**
   * Slider Types
   */
  TYPES: {
    HOSPITAL: "Hospital",
    CLINIC: "Clinic",
    DOCTOR: "Doctor",
    URL: "URL",
    NONE: "None",
  },

  /**
   * List Sliders with filtering and pagination
   * GET /sliders
   * @param {Object} params - Query parameters
   * @param {string} params.search - Search in title
   * @param {number} params.status - Filter by status (1=active, 0=inactive)
   * @param {string} params.type - Filter by type (Hospital, Clinic, Doctor, URL, None)
   * @param {number} params.per_page - Items per page
   * @param {number} params.page - Page number
   * @returns {Promise}
   */
  getSliders: async (params = {}) => {
    try {
      const response = await apiClient.get("/sliders", { params });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data?.items || [],
          meta: {
            current_page: response.data.data?.current_page || 1,
            last_page: response.data.data?.last_page || 1,
            total: response.data.data?.count || 0,
          },
          message: response.data.message,
        };
      }

      return {
        success: false,
        data: [],
        meta: { current_page: 1, last_page: 1, total: 0 },
        message: response.data?.message || "Failed to fetch sliders",
      };
    } catch (error) {
      console.error("[SlidersService] Get sliders error:", error);
      return {
        success: false,
        data: [],
        meta: { current_page: 1, last_page: 1, total: 0 },
        message: error.response?.data?.message || "Error fetching sliders",
      };
    }
  },

  /**
   * Get Slider Details
   * GET /sliders/{id}
   * @param {number} id - Slider ID
   * @returns {Promise}
   */
  getSliderById: async (id) => {
    try {
      const response = await apiClient.get(`/sliders/${id}`);

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
        message: response.data?.message || "Failed to fetch slider details",
      };
    } catch (error) {
      console.error("[SlidersService] Get slider by ID error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error fetching slider details",
      };
    }
  },

  /**
   * Create Slider
   * POST /sliders
   * @param {FormData} formData - Slider data
   * @returns {Promise}
   */
  createSlider: async (formData) => {
    try {
      const response = await apiClient.post("/sliders", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Slider created successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to create slider",
      };
    } catch (error) {
      console.error("[SlidersService] Create slider error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error creating slider",
      };
    }
  },

  /**
   * Update Slider
   * POST /sliders/{id}
   * @param {number} id - Slider ID
   * @param {FormData} formData - Updated slider data
   * @returns {Promise}
   */
  updateSlider: async (id, formData) => {
    try {
      const response = await apiClient.post(`/sliders/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Slider updated successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to update slider",
      };
    } catch (error) {
      console.error("[SlidersService] Update slider error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error updating slider",
      };
    }
  },

  /**
   * Toggle Slider Status
   * POST /sliders/update-status/{id}
   * @param {number} id - Slider ID
   * @returns {Promise}
   */
  toggleSliderStatus: async (id) => {
    try {
      const response = await apiClient.post(`/sliders/update-status/${id}`);

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Slider status updated",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Failed to update slider status",
      };
    } catch (error) {
      console.error("[SlidersService] Toggle slider status error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error updating slider status",
      };
    }
  },

  /**
   * Delete Slider
   * DELETE /sliders/{id}
   * @param {number} id - Slider ID
   * @returns {Promise}
   */
  deleteSlider: async (id) => {
    try {
      const response = await apiClient.delete(`/sliders/${id}`);

      if (response.data?.status === "success") {
        return {
          success: true,
          message: response.data.message || "Slider deleted successfully",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Failed to delete slider",
      };
    } catch (error) {
      console.error("[SlidersService] Delete slider error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error deleting slider",
      };
    }
  },

  /**
   * Get Providers Dropdown for linking
   * GET /drop-down-list/providers
   * @param {string} type - Provider type (Hospital, Clinic, Doctor)
   * @returns {Promise}
   */
  getProvidersDropdown: async (type) => {
    try {
      const response = await apiClient.get("/drop-down-list/providers", {
        params: { type },
      });

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
        message: "No providers available",
      };
    } catch (error) {
      console.error("[SlidersService] Get providers dropdown error:", error);
      return {
        success: true,
        data: [],
        message: "Error fetching providers",
      };
    }
  },

  /**
   * Build FormData for create/update
   * @param {Object} data - Slider data
   * @returns {FormData}
   */
  buildFormData: (data) => {
    const formData = new FormData();

    // Required fields
    formData.append("type", data.type);
    formData.append("status", data.status ? "1" : "0");
    formData.append("sort", data.sort || 1);

    // URL field (based on type)
    if (data.type !== "None" && data.url) {
      formData.append("url", data.url);
    }

    // Date range (optional)
    if (data.start_at) formData.append("start_at", data.start_at);
    if (data.end_at) formData.append("end_at", data.end_at);

    // Translations
    if (data.ar_title) formData.append("ar[title]", data.ar_title);
    if (data.en_title) formData.append("en[title]", data.en_title);

    // Image (optional for update)
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    return formData;
  },

  /**
   * Get type badge color
   * @param {string} type - Slider type
   * @returns {string} - Tailwind classes
   */
  getTypeBadgeColor: (type) => {
    const colors = {
      Hospital: "bg-blue-50 text-blue-700 border-blue-200",
      Clinic: "bg-purple-50 text-purple-700 border-purple-200",
      Doctor: "bg-teal-50 text-teal-700 border-teal-200",
      URL: "bg-orange-50 text-orange-700 border-orange-200",
      None: "bg-slate-50 text-slate-700 border-slate-200",
    };
    return colors[type] || colors.None;
  },

  /**
   * Get type icon name
   * @param {string} type - Slider type
   * @returns {string} - Icon name
   */
  getTypeIcon: (type) => {
    const icons = {
      Hospital: "Building2",
      Clinic: "Stethoscope",
      Doctor: "User",
      URL: "ExternalLink",
      None: "Image",
    };
    return icons[type] || "Image";
  },

  /**
   * Format date for display
   * @param {string} date - Date string
   * @returns {string}
   */
  formatDate: (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("ar-EG");
  },

  /**
   * Check if slider is currently active (within date range)
   * @param {Object} slider - Slider object
   * @returns {boolean}
   */
  isSliderInDateRange: (slider) => {
    if (!slider.start_at && !slider.end_at) return true;

    const now = new Date();
    const start = slider.start_at ? new Date(slider.start_at) : null;
    const end = slider.end_at ? new Date(slider.end_at) : null;

    if (start && now < start) return false;
    if (end && now > end) return false;

    return true;
  },
};

export default SlidersService;
