"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  Save,
  Mail,
  Smartphone,
  MessageSquare,
  Calendar,
  Star,
  RefreshCw,
} from "lucide-react";

export default function HospitalSettingsPage() {
  const t = useTranslations("hospital.settings");
  const tCommon = useTranslations("common");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    newBookings: true,
    reviews: true,
    systemUpdates: false,
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password change:", passwordData);
  };

  const handleSettingsSave = (e) => {
    e.preventDefault();
    console.log("Settings saved:", notifications);
  };

  return (
    <DashboardLayout requiredUserType="hospital">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-600 mt-1">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-secondary" />
              {t("accountSettings")}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {tCommon("email")}
                </label>
                <Input
                  type="email"
                  value="info@sunrise.qa"
                  disabled
                  className="bg-slate-50"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Contact support to change your email address
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {tCommon("phone")}
                </label>
                <Input
                  type="tel"
                  value="+974 4444 1111"
                  disabled
                  className="bg-slate-50"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Contact support to change your phone number
                </p>
              </div>
            </div>
          </Card>

          {/* Password Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-secondary" />
              {t("passwordSettings")}
            </h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t("currentPassword")}
                </label>
                <Input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t("newPassword")}
                </label>
                <Input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t("confirmPassword")}
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-white"
              >
                <Lock className="h-4 w-4 mr-2" />
                {t("changePassword")}
              </Button>
            </form>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-secondary" />
              {t("notificationSettings")}
            </h3>
            <form onSubmit={handleSettingsSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notification Channels */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-700 mb-3">
                    Notification Channels
                  </h4>

                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-medium text-slate-900">
                          {t("emailNotifications")}
                        </p>
                        <p className="text-xs text-slate-500">
                          Receive updates via email
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={notifications.emailNotifications}
                      onCheckedChange={() =>
                        handleNotificationChange("emailNotifications")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-medium text-slate-900">
                          {t("pushNotifications")}
                        </p>
                        <p className="text-xs text-slate-500">
                          Receive push notifications
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={notifications.pushNotifications}
                      onCheckedChange={() =>
                        handleNotificationChange("pushNotifications")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-medium text-slate-900">
                          {t("smsNotifications")}
                        </p>
                        <p className="text-xs text-slate-500">
                          Receive SMS messages
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={notifications.smsNotifications}
                      onCheckedChange={() =>
                        handleNotificationChange("smsNotifications")
                      }
                    />
                  </div>
                </div>

                {/* Notification Types */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-700 mb-3">
                    Notification Types
                  </h4>

                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-900">
                          {t("appointmentReminders")}
                        </p>
                        <p className="text-xs text-slate-500">
                          Get notified about appointments
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={notifications.appointmentReminders}
                      onCheckedChange={() =>
                        handleNotificationChange("appointmentReminders")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-slate-900">
                          {t("newBookings")}
                        </p>
                        <p className="text-xs text-slate-500">
                          Get notified about new bookings
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={notifications.newBookings}
                      onCheckedChange={() =>
                        handleNotificationChange("newBookings")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-slate-900">
                          {t("reviews")}
                        </p>
                        <p className="text-xs text-slate-500">
                          Get notified about new reviews
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={notifications.reviews}
                      onCheckedChange={() =>
                        handleNotificationChange("reviews")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">
                          {t("systemUpdates")}
                        </p>
                        <p className="text-xs text-slate-500">
                          Get notified about system updates
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={notifications.systemUpdates}
                      onCheckedChange={() =>
                        handleNotificationChange("systemUpdates")
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t border-slate-200">
                <Button
                  type="submit"
                  className="bg-secondary hover:bg-secondary/90 text-white px-8"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {t("saveSettings")}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
