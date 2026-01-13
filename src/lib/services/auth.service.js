import apiClient from "../api/client";

/**
 * Auth Service - Handles all authentication related API calls
 * Base URL: /dashboard (already in API_BASE_URL)
 */
const AuthService = {
  /**
   * Login - Super Admin
   * POST /login
   * @param {Object} credentials - { email, password }
   * @returns {Promise} - { access_token, token_type, admin }
   */
  login: async (credentials) => {
    try {
      const formData = new FormData();
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);

      const response = await apiClient.post("/login", formData);

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }

      return {
        success: false,
        message: response.data?.message || "فشل تسجيل الدخول",
      };
    } catch (error) {
      console.error("[AuthService] Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول",
      };
    }
  },

  /**
   * Logout
   * GET /logout
   * @returns {Promise}
   */
  logout: async () => {
    try {
      const response = await apiClient.get("/logout");

      return {
        success: response.data?.status === "success",
        message: response.data?.message || "تم تسجيل الخروج بنجاح",
      };
    } catch (error) {
      console.error("[AuthService] Logout error:", error);
      // Even if logout fails on server, we should clear local state
      return {
        success: true,
        message: "تم تسجيل الخروج",
      };
    }
  },

  /**
   * Refresh Token
   * GET /refresh
   * @returns {Promise} - { access_token, token_type, admin }
   */
  refreshToken: async () => {
    try {
      const response = await apiClient.get("/refresh");

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }

      return {
        success: false,
        message: response.data?.message || "فشل تجديد التوكن",
      };
    } catch (error) {
      console.error("[AuthService] Refresh token error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "حدث خطأ أثناء تجديد التوكن",
      };
    }
  },

  /**
   * Get My Permissions
   * GET /get-my-permission
   * @returns {Promise} - Array of permissions
   */
  getPermissions: async () => {
    try {
      const response = await apiClient.get("/get-my-permission");

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
        message: response.data?.message || "فشل جلب الصلاحيات",
      };
    } catch (error) {
      console.error("[AuthService] Get permissions error:", error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || "حدث خطأ أثناء جلب الصلاحيات",
      };
    }
  },
};

export default AuthService;
