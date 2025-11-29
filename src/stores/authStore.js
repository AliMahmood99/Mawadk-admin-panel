import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

      // Mock users for testing
      mockUsers: {
        admin: {
          email: "admin@mawadk.qa",
          password: "admin123",
          data: {
            id: 1,
            name: "System Administrator",
            name_ar: "مدير النظام",
            email: "admin@mawadk.qa",
            type: "admin",
            role: "super_admin",
            avatar: null,
          }
        },
        hospital: {
          email: "hospital@mawadk.qa",
          password: "hospital123",
          data: {
            id: 1,
            name: "Sunrise Medical Center",
            name_ar: "مركز الشروق الطبي",
            email: "info@sunrise.qa",
            phone: "+974 4444 1111",
            type: "hospital",
            hospital_type: "hospital",
            avatar: null,
          }
        },
        doctor: {
          email: "doctor@mawadk.qa",
          password: "doctor123",
          data: {
            id: 1,
            name: "Dr. Ahmed Khalil",
            name_ar: "د. أحمد خليل",
            email: "dr.ahmed@sunrise.qa",
            phone: "+974 5551 1111",
            type: "doctor",
            specialty: "Pediatrics",
            specialty_ar: "طب الأطفال",
            hospital_name: "Sunrise Medical Center",
            hospital_name_ar: "مركز الشروق الطبي",
            avatar: null,
          }
        }
      },

      // Actions
      /**
       * Login action
       * @param {Object} credentials - { email, password, userType }
       */
      login: async (credentials) => {
        set({ isLoading: true });

        try {
          const { email, password, userType } = credentials;

          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Check mock users
          const mockUser = get().mockUsers[userType];

          if (!mockUser || mockUser.email !== email || mockUser.password !== password) {
            set({ isLoading: false });
            return {
              success: false,
              message: "Invalid email or password",
            };
          }

          // Generate mock token
          const access_token = `mock_token_${userType}_${Date.now()}`;

          // Save token to localStorage and cookies
          if (typeof window !== "undefined") {
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user_type", userType);

            // Set cookies for middleware (expires in 30 days)
            document.cookie = `access_token=${access_token}; path=/; max-age=${30 * 24 * 60 * 60}`;
            document.cookie = `user_type=${userType}; path=/; max-age=${30 * 24 * 60 * 60}`;
          }

          // Update store
          set({
            user: mockUser.data,
            token: access_token,
            userType: userType,
            isAuthenticated: true,
            isLoading: false,
            permissions: userType === 'admin' ? ['all'] : [], // Admin has all permissions
          });

          return {
            success: true,
            message: "Login successful",
            userType: userType,
          };

        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            message: error.message || "An error occurred during login",
          };
        }
      },

      /**
       * Logout action
       */
      logout: async () => {
        set({ isLoading: true });

        try {
          // Clear token from localStorage and cookies
          if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_type");

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
       * Check if user has permission
       * @param {string} permissionName - Permission to check
       * @returns {boolean}
       */
      hasPermission: (permissionName) => {
        const { permissions, user, userType } = get();

        // Super Admin has all permissions
        if (userType === 'admin' || user?.role === 'super_admin') {
          return true;
        }

        if (!permissionName || !Array.isArray(permissions)) {
          return false;
        }

        // Check if user has the permission
        return permissions.some((perm) => {
          return perm === permissionName || perm === 'all';
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
      }),
    }
  )
);

// Named export
export { useAuthStore };

// Default export
export default useAuthStore;
