import apiClient from "../api/client";

/**
 * Categories Service - Handles all category management API calls
 * Categories represent medical specialties (e.g., Internal Medicine, Dermatology)
 */
const CategoriesService = {
  /**
   * List Categories with pagination and filters
   * GET /categories
   * @param {Object} params - Query parameters
   * @param {string} params.search - Search in name
   * @param {number} params.status - Filter by status (0=inactive, 1=active)
   * @param {number} params.per_page - Items per page
   * @param {number} params.page - Page number
   * @returns {Promise} - { items, meta, reports }
   */
  getCategories: async (params = {}) => {
    try {
      const response = await apiClient.get("/categories", { params });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data?.items || [],
          meta: response.data.data?.meta || {},
          reports: response.data.data?.reports || {},
          message: response.data.message,
        };
      }

      return {
        success: false,
        data: [],
        meta: {},
        reports: {},
        message: response.data?.message || "Failed to fetch categories",
      };
    } catch (error) {
      console.error("[CategoriesService] Get categories error:", error);
      return {
        success: false,
        data: [],
        meta: {},
        reports: {},
        message: error.response?.data?.message || "Error fetching categories",
      };
    }
  },

  /**
   * Get Category Details for Edit Form
   * GET /categories/{id}
   * @param {number} id - Category ID
   * @returns {Promise} - Category with translations
   */
  getCategoryById: async (id) => {
    try {
      const response = await apiClient.get(`/categories/${id}`);

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
        message: response.data?.message || "Failed to fetch category",
      };
    } catch (error) {
      console.error("[CategoriesService] Get category by ID error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error fetching category",
      };
    }
  },

  /**
   * Get Category Details with Statistics Report
   * GET /categories/show-with-report/{id}
   * @param {number} id - Category ID
   * @returns {Promise} - Category with statistics
   */
  getCategoryWithReport: async (id) => {
    try {
      const response = await apiClient.get(`/categories/show-with-report/${id}`);

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
        message: response.data?.message || "Failed to fetch category report",
      };
    } catch (error) {
      console.error("[CategoriesService] Get category report error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error fetching category report",
      };
    }
  },

  /**
   * Create Category
   * POST /categories
   * @param {Object} data - Category data
   * @param {number} data.is_active - Status (0=inactive, 1=active)
   * @param {number} data.sort - Display order
   * @param {string} data.ar_name - Arabic name
   * @param {string} data.en_name - English name
   * @param {File} data.image - Category icon
   * @returns {Promise}
   */
  createCategory: async (data) => {
    try {
      const formData = new FormData();
      formData.append("is_active", data.is_active ? 1 : 0);
      formData.append("sort", data.sort || 1);
      formData.append("ar[name]", data.ar_name);
      formData.append("en[name]", data.en_name);

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await apiClient.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Category created successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to create category",
      };
    } catch (error) {
      console.error("[CategoriesService] Create category error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error creating category",
      };
    }
  },

  /**
   * Update Category
   * POST /categories/{id}
   * @param {number} id - Category ID
   * @param {Object} data - Category data (same as create)
   * @returns {Promise}
   */
  updateCategory: async (id, data) => {
    try {
      const formData = new FormData();

      if (data.is_active !== undefined) {
        formData.append("is_active", data.is_active ? 1 : 0);
      }
      if (data.sort !== undefined) {
        formData.append("sort", data.sort);
      }
      if (data.ar_name) {
        formData.append("ar[name]", data.ar_name);
      }
      if (data.en_name) {
        formData.append("en[name]", data.en_name);
      }
      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await apiClient.post(`/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Category updated successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to update category",
      };
    } catch (error) {
      console.error("[CategoriesService] Update category error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error updating category",
      };
    }
  },

  /**
   * Toggle Category Status
   * POST /categories/update-status/{id}
   * @param {number} id - Category ID
   * @returns {Promise}
   */
  toggleCategoryStatus: async (id) => {
    try {
      const response = await apiClient.post(`/categories/update-status/${id}`);

      if (response.data?.status === "success") {
        return {
          success: true,
          message: response.data.message || "Status updated successfully",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Failed to update status",
      };
    } catch (error) {
      console.error("[CategoriesService] Toggle status error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error updating status",
      };
    }
  },

  /**
   * Delete Category
   * DELETE /categories/{id}
   * @param {number} id - Category ID
   * @returns {Promise}
   */
  deleteCategory: async (id) => {
    try {
      const response = await apiClient.delete(`/categories/${id}`);

      if (response.data?.status === "success") {
        return {
          success: true,
          message: response.data.message || "Category deleted successfully",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Failed to delete category",
      };
    } catch (error) {
      console.error("[CategoriesService] Delete category error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error deleting category",
      };
    }
  },
};

export default CategoriesService;
