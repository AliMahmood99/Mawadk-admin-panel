import apiClient from "../api/client";

/**
 * Profile Service - Handles all profile related API calls
 * Base URL: /dashboard (already in API_BASE_URL)
 */
const ProfileService = {
  /**
   * Get Profile
   * GET /get-profile
   * @returns {Promise} - Admin profile object
   */
  getProfile: async () => {
    try {
      const response = await apiClient.get("/get-profile");

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
        message: response.data?.message || "فشل جلب البروفايل",
      };
    } catch (error) {
      console.error("[ProfileService] Get profile error:", error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || "حدث خطأ أثناء جلب البروفايل",
      };
    }
  },

  /**
   * Update Account
   * POST /update-account
   * @param {Object} data - { name, email, phone, image (file) }
   * @returns {Promise} - Updated admin profile
   */
  updateAccount: async (data) => {
    try {
      const formData = new FormData();

      // Add text fields
      if (data.name) formData.append("name", data.name);
      if (data.email) formData.append("email", data.email);
      if (data.phone) formData.append("phone", data.phone);

      // Add image if provided
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await apiClient.post("/update-account", formData);

      if (response.data?.status === "success") {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "تم تحديث الحساب بنجاح",
        };
      }

      return {
        success: false,
        message: response.data?.message || "فشل تحديث الحساب",
      };
    } catch (error) {
      console.error("[ProfileService] Update account error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "حدث خطأ أثناء تحديث الحساب",
      };
    }
  },

  /**
   * Change Password
   * POST /change-password
   * @param {Object} data - { old_password, new_password, new_password_confirmation }
   * @returns {Promise}
   */
  changePassword: async (data) => {
    try {
      const formData = new FormData();
      formData.append("old_password", data.old_password);
      formData.append("new_password", data.new_password);
      formData.append("new_password_confirmation", data.new_password_confirmation);

      const response = await apiClient.post("/change-password", formData);

      if (response.data?.status === "success") {
        return {
          success: true,
          message: response.data.message || "تم تغيير كلمة المرور بنجاح",
        };
      }

      return {
        success: false,
        message: response.data?.message || "فشل تغيير كلمة المرور",
      };
    } catch (error) {
      console.error("[ProfileService] Change password error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور",
      };
    }
  },
};

export default ProfileService;
