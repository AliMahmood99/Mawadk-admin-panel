import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AuthService from "@/lib/services/auth.service";
import ProfileService from "@/lib/services/profile.service";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      userType: null, // 'admin', 'hospital', 'doctor'
      isAuthenticated: false,
      isLoading: false,
      permissions: [],

      // Actions
      /**
       * Login action - Uses real API
       * @param {Object} credentials - { email, password, userType }
       */
      login: async (credentials) => {
        set({ isLoading: true });

        try {
          const { email, password, userType } = credentials;

          // Call the real API
          const result = await AuthService.login({ email, password });

          if (!result.success) {
            set({ isLoading: false });
            return {
              success: false,
              message: result.message || "فشل تسجيل الدخول",
            };
          }

          const { access_token, admin } = result.data;

          // Save token to localStorage and cookies
          if (typeof window !== "undefined") {
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user_type", userType);

            // Set cookies for middleware (expires in 30 days)
            document.cookie = `access_token=${access_token}; path=/; max-age=${30 * 24 * 60 * 60}`;
            document.cookie = `user_type=${userType}; path=/; max-age=${30 * 24 * 60 * 60}`;
          }

          // Fetch permissions after login
          const permissionsResult = await AuthService.getPermissions();
          const permissions = permissionsResult.success ? permissionsResult.data : [];

          // Update store
          set({
            user: admin,
            token: access_token,
            userType: userType,
            isAuthenticated: true,
            isLoading: false,
            permissions: permissions,
          });

          return {
            success: true,
            message: "تم تسجيل الدخول بنجاح",
            userType: userType,
          };

        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            message: error.message || "حدث خطأ أثناء تسجيل الدخول",
          };
        }
      },

      /**
       * Logout action - Uses real API
       */
      logout: async () => {
        set({ isLoading: true });

        try {
          // Call the real API
          await AuthService.logout();

          // Clear token from localStorage and cookies
          if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_type");
            localStorage.removeItem("auth-storage");

            // Clear cookies
            document.cookie = "access_token=; path=/; max-age=0";
            document.cookie = "user_type=; path=/; max-age=0";
          }

          // Clear store
          set({
            user: null,
            token: null,
            userType: null,
            isAuthenticated: false,
            permissions: [],
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false };
        }
      },

      /**
       * Refresh token
       */
      refreshToken: async () => {
        try {
          const result = await AuthService.refreshToken();

          if (result.success) {
            const { access_token, admin } = result.data;

            if (typeof window !== "undefined") {
              localStorage.setItem("access_token", access_token);
              document.cookie = `access_token=${access_token}; path=/; max-age=${30 * 24 * 60 * 60}`;
            }

            set({
              user: admin,
              token: access_token,
            });

            return { success: true };
          }

          return { success: false };
        } catch (error) {
          return { success: false };
        }
      },

      /**
       * Fetch and update permissions
       */
      fetchPermissions: async () => {
        try {
          const result = await AuthService.getPermissions();

          if (result.success) {
            set({ permissions: result.data });
            return { success: true, data: result.data };
          }

          return { success: false, data: [] };
        } catch (error) {
          return { success: false, data: [] };
        }
      },

      /**
       * Get profile from API
       */
      getProfile: async () => {
        try {
          const result = await ProfileService.getProfile();

          if (result.success) {
            set({ user: result.data });
            return { success: true, data: result.data };
          }

          return { success: false, data: null };
        } catch (error) {
          return { success: false, data: null };
        }
      },

      /**
       * Update profile
       */
      updateProfile: async (data) => {
        try {
          const result = await ProfileService.updateAccount(data);

          if (result.success) {
            set({ user: result.data });
            return { success: true, data: result.data, message: result.message };
          }

          return { success: false, message: result.message };
        } catch (error) {
          return { success: false, message: error.message };
        }
      },

      /**
       * Change password
       */
      changePassword: async (data) => {
        try {
          const result = await ProfileService.changePassword(data);
          return result;
        } catch (error) {
          return { success: false, message: error.message };
        }
      },

      /**
       * Check if user has permission
       * @param {string} permissionName - Permission to check
       * @returns {boolean}
       */
      hasPermission: (permissionName) => {
        const { permissions, user, userType } = get();

        // Super Admin has all permissions
        if (userType === 'admin' || user?.type === 'Admin') {
          return true;
        }

        if (!permissionName || !Array.isArray(permissions)) {
          return false;
        }

        // Check if user has the permission
        return permissions.some((perm) => {
          return perm.name === permissionName || perm === permissionName || perm === 'all';
        });
      },

      /**
       * Get user type
       * @returns {string|null}
       */
      getUserType: () => {
        return get().userType;
      },

      /**
       * Check if user is admin
       * @returns {boolean}
       */
      isAdmin: () => {
        return get().userType === 'admin';
      },

      /**
       * Check if user is hospital
       * @returns {boolean}
       */
      isHospital: () => {
        return get().userType === 'hospital';
      },

      /**
       * Check if user is doctor
       * @returns {boolean}
       */
      isDoctor: () => {
        return get().userType === 'doctor';
      },

      /**
       * Initialize auth from localStorage (for page refresh)
       */
      initialize: () => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("access_token");
          const userType = localStorage.getItem("user_type");
          const storedUser = localStorage.getItem("auth-storage");

          if (token && userType && storedUser) {
            try {
              const parsed = JSON.parse(storedUser);
              if (parsed.state?.user) {
                set({
                  user: parsed.state.user,
                  token,
                  userType,
                  isAuthenticated: true,
                });
              }
            } catch (error) {
              console.error("Failed to parse stored auth data:", error);
            }
          }
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : undefined
      ),
      partialize: (state) => ({
        user: state.user,
        userType: state.userType,
        isAuthenticated: state.isAuthenticated,
        permissions: state.permissions,
      }),
    }
  )
);

// Named export
export { useAuthStore };

// Default export
export default useAuthStore;
