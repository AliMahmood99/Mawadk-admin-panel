import apiClient from "../api/client";

/**
 * Providers Service - Handles all provider management API calls
 * Provider Types: Hospital, Clinic, Doctor
 * Base URL: /dashboard (already in API_BASE_URL)
 */
const ProvidersService = {
  /**
   * List Providers with filtering and pagination
   * GET /providers
   * @param {Object} params - Query parameters
   * @param {string} params.search - Search in name, phone, email
   * @param {string} params.status - Filter by status (active, inactive)
   * @param {string} params.type - Filter by single type (Hospital, Clinic, Doctor)
   * @param {string[]} params.array_type - Filter by multiple types
   * @param {string} params.from_registration_at - Registration date from (YYYY-MM-DD)
   * @param {string} params.to_registration_at - Registration date to (YYYY-MM-DD)
   * @param {number} params.per_page - Items per page (default: 10)
   * @param {number} params.page - Page number
   * @returns {Promise} - { items, meta, reports }
   */
  getProviders: async (params = {}) => {
    try {
      // Handle array_type parameter
      const queryParams = { ...params };
      if (queryParams.array_type && Array.isArray(queryParams.array_type)) {
        delete queryParams.array_type;
        queryParams["array_type[]"] = params.array_type;
      }

      const response = await apiClient.get("/providers", { params: queryParams });

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
        message: response.data?.message || "Failed to fetch providers",
      };
    } catch (error) {
      console.error("[ProvidersService] Get providers error:", error);
      return {
        success: false,
        data: [],
        meta: { current_page: 1, last_page: 1, total: 0 },
        reports: {},
        message: error.response?.data?.message || "Error fetching providers",
      };
    }
  },

  /**
   * Get Providers Dropdown List
   * GET /drop-down-list/providers
   * @param {Object} params - Query parameters
   * @returns {Promise} - Array of { id, name, type, phone }
   */
  getProvidersDropdown: async (params = {}) => {
    try {
      const response = await apiClient.get("/drop-down-list/providers", { params });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data || [],
          message: response.data.message,
        };
      }

      return {
        success: false,
        data: [],
        message: response.data?.message || "Failed to fetch providers dropdown",
      };
    } catch (error) {
      console.error("[ProvidersService] Get providers dropdown error:", error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || "Error fetching providers dropdown",
      };
    }
  },

  /**
   * Get Provider Details
   * GET /providers/{id}
   * @param {number} id - Provider ID
   * @returns {Promise} - Provider details with translations, categories, schedules
   */
  getProviderById: async (id) => {
    try {
      const response = await apiClient.get(`/providers/${id}`);

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
        message: response.data?.message || "Failed to fetch provider details",
      };
    } catch (error) {
      console.error("[ProvidersService] Get provider by ID error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error fetching provider details",
      };
    }
  },

  /**
   * Get Provider for Update (Edit Form)
   * GET /providers/show-for-update/{id}
   * @param {number} id - Provider ID
   * @returns {Promise} - Provider data formatted for edit form
   */
  getProviderForUpdate: async (id) => {
    try {
      const response = await apiClient.get(`/providers/show-for-update/${id}`);

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
        message: response.data?.message || "Failed to fetch provider for update",
      };
    } catch (error) {
      console.error("[ProvidersService] Get provider for update error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error fetching provider for update",
      };
    }
  },

  /**
   * Create Provider
   * POST /providers
   * @param {FormData} formData - Provider data
   * @returns {Promise}
   */
  createProvider: async (formData) => {
    try {
      const response = await apiClient.post("/providers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Provider created successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to create provider",
      };
    } catch (error) {
      console.error("[ProvidersService] Create provider error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error creating provider",
      };
    }
  },

  /**
   * Update Provider
   * POST /providers/{id}
   * @param {number} id - Provider ID
   * @param {FormData} formData - Updated provider data
   * @returns {Promise}
   */
  updateProvider: async (id, formData) => {
    try {
      const response = await apiClient.post(`/providers/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Provider updated successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to update provider",
      };
    } catch (error) {
      console.error("[ProvidersService] Update provider error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error updating provider",
      };
    }
  },

  /**
   * Update Provider Status (Toggle)
   * POST /providers/update-status/{id}
   * @param {number} id - Provider ID
   * @returns {Promise}
   */
  updateProviderStatus: async (id) => {
    try {
      const response = await apiClient.post(`/providers/update-status/${id}`);

      if (response.data?.status === "success") {
        return {
          success: true,
          message: response.data.message || "Provider status updated successfully",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Failed to update provider status",
      };
    } catch (error) {
      console.error("[ProvidersService] Update provider status error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error updating provider status",
      };
    }
  },

  /**
   * Get Categories Dropdown List
   * GET /drop-down-list/categories
   * @returns {Promise} - Array of categories for select
   */
  getCategoriesDropdown: async () => {
    try {
      const response = await apiClient.get("/drop-down-list/categories");

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data || [],
          message: response.data.message,
        };
      }

      return {
        success: false,
        data: [],
        message: response.data?.message || "Failed to fetch categories",
      };
    } catch (error) {
      console.error("[ProvidersService] Get categories dropdown error:", error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || "Error fetching categories",
      };
    }
  },
};

export default ProvidersService;
