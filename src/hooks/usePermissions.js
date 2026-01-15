"use client";

import { useAuthStore } from "@/stores/authStore";
import { useMemo, useCallback } from "react";

/**
 * Permission names mapping for easy reference
 * Format: module.resource.action
 * Actions: view, create, edit, delete, special
 */
export const PERMISSIONS = {
  // Dashboard
  DASHBOARD: "dashboard.details.special",

  // Bookings/Appointments
  BOOKINGS_VIEW: "bookings.bookings.view",
  BOOKINGS_CREATE: "bookings.bookings.create",
  BOOKINGS_EDIT: "bookings.bookings.edit",
  BOOKINGS_DELETE: "bookings.bookings.delete",

  // Providers
  PROVIDERS_VIEW: "providers.providers.view",
  PROVIDERS_CREATE: "providers.providers.create",
  PROVIDERS_EDIT: "providers.providers.edit",
  PROVIDERS_DELETE: "providers.providers.delete",

  // Provider Doctors
  DOCTOR_PROVIDERS_VIEW: "providers.doctor_providers.view",
  DOCTOR_PROVIDERS_CREATE: "providers.doctor_providers.create",
  DOCTOR_PROVIDERS_EDIT: "providers.doctor_providers.edit",
  DOCTOR_PROVIDERS_DELETE: "providers.doctor_providers.delete",

  // Clients/Users
  CLIENTS_VIEW: "clients.clients.view",
  CLIENTS_CREATE: "clients.clients.create",
  CLIENTS_EDIT: "clients.clients.edit",
  CLIENTS_DELETE: "clients.clients.delete",

  // Categories
  CATEGORIES_VIEW: "categories.categories.view",
  CATEGORIES_CREATE: "categories.categories.create",
  CATEGORIES_EDIT: "categories.categories.edit",
  CATEGORIES_DELETE: "categories.categories.delete",

  // Sliders
  SLIDERS_VIEW: "sliders.sliders.view",
  SLIDERS_CREATE: "sliders.sliders.create",
  SLIDERS_EDIT: "sliders.sliders.edit",
  SLIDERS_DELETE: "sliders.sliders.delete",

  // Messages
  CONTACT_US: "messages.contact_us.special",

  // Reports
  BOOKINGS_REPORT: "reports.bookings_report.special",
  CATEGORIES_REPORT: "reports.categories_report.special",
  PROVIDERS_REPORT: "reports.providers_report.special",
  DOCTOR_PROVIDERS_REPORT: "reports.doctor_providers_report.special",
  CLIENTS_REPORT: "reports.clients_report.special",

  // Settings
  ICONS_VIEW: "settings.icons.view",
  ICONS_CREATE: "settings.icons.create",
  ICONS_EDIT: "settings.icons.edit",
  ICONS_DELETE: "settings.icons.delete",
  GENERAL_SETTINGS: "settings.general_settings.special",
  REASON_CANCELLATIONS_VIEW: "settings.reason_cancellations.view",

  // Info Module
  INFOS: "info_module.infos.special",
  FAQ_VIEW: "info_module.fqa.view",
  FAQ_CREATE: "info_module.fqa.create",
  FAQ_EDIT: "info_module.fqa.edit",
  FAQ_DELETE: "info_module.fqa.delete",

  // Notifications
  NOTIFICATIONS_VIEW: "notification_module.notifications.view",
  NOTIFICATIONS_CREATE: "notification_module.notifications.create",
  NOTIFICATIONS_EDIT: "notification_module.notifications.edit",
  NOTIFICATIONS_DELETE: "notification_module.notifications.delete",

  // Admins
  ADMINS_VIEW: "admin_module.admins.view",
  ADMINS_CREATE: "admin_module.admins.create",
  ADMINS_EDIT: "admin_module.admins.edit",
  ADMINS_DELETE: "admin_module.admins.delete",
};

/**
 * Custom hook for permission management
 * @returns {Object} Permission utilities
 */
export function usePermissions() {
  const { permissions, user } = useAuthStore();

  /**
   * Check if current user is Super Admin (has all permissions)
   */
  const isSuperAdmin = useMemo(() => {
    return user?.type === "Admin";
  }, [user]);

  /**
   * Get list of permission names from permissions array
   */
  const permissionNames = useMemo(() => {
    if (!Array.isArray(permissions)) return [];
    return permissions.map((p) => (typeof p === "string" ? p : p.name));
  }, [permissions]);

  /**
   * Check if user has a specific permission
   * @param {string} permission - Permission name to check
   * @returns {boolean}
   */
  const hasPermission = useCallback(
    (permission) => {
      // Super Admin has all permissions
      if (isSuperAdmin) return true;

      if (!permission) return false;

      return permissionNames.includes(permission);
    },
    [isSuperAdmin, permissionNames]
  );

  /**
   * Check if user has ANY of the provided permissions
   * @param {string[]} permissionList - Array of permission names
   * @returns {boolean}
   */
  const hasAnyPermission = useCallback(
    (permissionList) => {
      if (isSuperAdmin) return true;

      if (!Array.isArray(permissionList)) return false;

      return permissionList.some((p) => permissionNames.includes(p));
    },
    [isSuperAdmin, permissionNames]
  );

  /**
   * Check if user has ALL of the provided permissions
   * @param {string[]} permissionList - Array of permission names
   * @returns {boolean}
   */
  const hasAllPermissions = useCallback(
    (permissionList) => {
      if (isSuperAdmin) return true;

      if (!Array.isArray(permissionList)) return false;

      return permissionList.every((p) => permissionNames.includes(p));
    },
    [isSuperAdmin, permissionNames]
  );

  /**
   * Check CRUD permissions for a resource
   * @param {string} module - Module name (e.g., "providers", "sliders")
   * @param {string} resource - Resource name (e.g., "providers", "sliders")
   * @returns {Object} - { canView, canCreate, canEdit, canDelete }
   */
  const getCRUDPermissions = useCallback(
    (module, resource) => {
      if (isSuperAdmin) {
        return {
          canView: true,
          canCreate: true,
          canEdit: true,
          canDelete: true,
        };
      }

      const base = `${module}.${resource}`;
      return {
        canView: permissionNames.includes(`${base}.view`),
        canCreate: permissionNames.includes(`${base}.create`),
        canEdit: permissionNames.includes(`${base}.edit`),
        canDelete: permissionNames.includes(`${base}.delete`),
      };
    },
    [isSuperAdmin, permissionNames]
  );

  return {
    permissions,
    permissionNames,
    isSuperAdmin,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getCRUDPermissions,
    PERMISSIONS,
  };
}

export default usePermissions;
