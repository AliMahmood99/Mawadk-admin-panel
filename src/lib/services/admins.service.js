import apiClient from "../api/client";

/**
 * Admins Service - Handles all admin management API calls
 * Base URL: /dashboard (already in API_BASE_URL)
 */
const AdminsService = {
  /**
   * Get All Permissions (For Admin Creation)
   * GET /get-all-permission
   * @returns {Promise} - { permissions, special }
   */
  getAllPermissions: async () => {
    try {
      const response = await apiClient.get("/get-all-permission");

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }

      return {
        success: false,
        data: { permissions: {}, special: [] },
        message: response.data?.message || "Failed to fetch permissions",
      };
    } catch (error) {
      console.error("[AdminsService] Get permissions error:", error);
      return {
        success: false,
        data: { permissions: {}, special: [] },
        message: error.response?.data?.message || "Error fetching permissions",
      };
    }
  },

  /**
   * List Admins
   * GET /admins
   * @param {Object} params - Query parameters
   * @param {string} params.search - Search by name, email, phone
   * @param {number} params.id - Filter by admin ID
   * @param {string} params.email - Filter by email
   * @returns {Promise} - Array of admins
   */
  getAdmins: async (params = {}) => {
    try {
      const response = await apiClient.get("/admins", { params });

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
        message: response.data?.message || "Failed to fetch admins",
      };
    } catch (error) {
      console.error("[AdminsService] Get admins error:", error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || "Error fetching admins",
      };
    }
  },

  /**
   * Get Admin Details
   * GET /admins/{id}
   * @param {number} id - Admin ID
   * @returns {Promise} - Admin details with permissions
   */
  getAdminById: async (id) => {
    try {
      const response = await apiClient.get(`/admins/${id}`);

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
        message: response.data?.message || "Failed to fetch admin details",
      };
    } catch (error) {
      console.error("[AdminsService] Get admin by ID error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error fetching admin details",
      };
    }
  },

  /**
   * Create Admin
   * POST /admins
   * @param {FormData} formData - Admin data including permissions
   * @returns {Promise}
   */
  createAdmin: async (formData) => {
    try {
      const response = await apiClient.post("/admins", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Admin created successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to create admin",
      };
    } catch (error) {
      console.error("[AdminsService] Create admin error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error creating admin",
      };
    }
  },

  /**
   * Update Admin
   * POST /admins/{id}
   * @param {number} id - Admin ID
   * @param {FormData} formData - Updated admin data
   * @returns {Promise}
   */
  updateAdmin: async (id, formData) => {
    try {
      const response = await apiClient.post(`/admins/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Admin updated successfully",
        };
      }

      return {
        success: false,
        data: null,
        message: response.data?.message || "Failed to update admin",
      };
    } catch (error) {
      console.error("[AdminsService] Update admin error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "Error updating admin",
      };
    }
  },

  /**
   * Update Admin Status (Toggle active/inactive)
   * POST /admins/update-status/{id}
   * @param {number} id - Admin ID
   * @returns {Promise}
   */
  updateAdminStatus: async (id) => {
    try {
      const response = await apiClient.post(`/admins/update-status/${id}`);

      if (response.data?.status === "success") {
        return {
          success: true,
          message: response.data.message || "Admin status updated successfully",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Failed to update admin status",
      };
    } catch (error) {
      console.error("[AdminsService] Update admin status error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error updating admin status",
      };
    }
  },

  /**
   * Check Password (Verify Admin Password)
   * POST /admins/check-password
   * @param {string} password - Password to verify
   * @returns {Promise}
   */
  checkPassword: async (password) => {
    try {
      const formData = new FormData();
      formData.append("password", password);

      const response = await apiClient.post("/admins/check-password", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.status === "success") {
        return {
          success: true,
          message: response.data.message || "Password verified",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Invalid password",
      };
    } catch (error) {
      console.error("[AdminsService] Check password error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error verifying password",
      };
    }
  },

  /**
   * Delete Admin (Soft Delete)
   * DELETE /admins/{id}
   * @param {number} id - Admin ID
   * @returns {Promise}
   */
  deleteAdmin: async (id) => {
    try {
      const response = await apiClient.delete(`/admins/${id}`);

      if (response.data?.status === "success") {
        return {
          success: true,
          message: response.data.message || "Admin deleted successfully",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Failed to delete admin",
      };
    } catch (error) {
      console.error("[AdminsService] Delete admin error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error deleting admin",
      };
    }
  },

  /**
   * List Deleted Admins
   * GET /admins/index-deleted
   * @param {Object} params - Query parameters
   * @returns {Promise} - Array of deleted admins
   */
  getDeletedAdmins: async (params = {}) => {
    try {
      const response = await apiClient.get("/admins/index-deleted", { params });

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
        message: response.data?.message || "Failed to fetch deleted admins",
      };
    } catch (error) {
      console.error("[AdminsService] Get deleted admins error:", error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || "Error fetching deleted admins",
      };
    }
  },

  /**
   * Restore Admin
   * GET /admins/restore/{id}
   * @param {number} id - Admin ID (soft-deleted)
   * @returns {Promise}
   */
  restoreAdmin: async (id) => {
    try {
      const response = await apiClient.get(`/admins/restore/${id}`);

      if (response.data?.status === "success") {
        return {
          success: true,
          message: response.data.message || "Admin restored successfully",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Failed to restore admin",
      };
    } catch (error) {
      console.error("[AdminsService] Restore admin error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error restoring admin",
      };
    }
  },
};

export default AdminsService;
