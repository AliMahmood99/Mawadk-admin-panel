"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Bell,
  Lock,
  Mail,
  Smartphone,
  MessageSquare,
  Calendar,
  Star,
  Globe,
  Save,
} from "lucide-react";

export default function DoctorSettingsPage() {
  const t = useTranslations("doctor.settings");
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
    patientMessages: true,
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

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password change:", passwordData);
  };

  const handleSettingsSave = () => {
    console.log("Settings saved:", notifications);
  };

  return (
    <DashboardLayout requiredUserType="doctor">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-600 mt-1">{t("subtitle")}</p>
        </div>

        {/* Password Settings */}
        <Card className="p-6 border-slate-200">
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
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-white gap-2"
              >
                <Save className="h-4 w-4" />
                {t("changePassword")}
              </Button>
            </div>
          </form>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6 border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-secondary" />
            {t("notificationSettings")}
          </h3>
          <div className="space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {t("emailNotifications")}
                  </p>
                  <p className="text-sm text-slate-500">
                    Receive notifications via email
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={() =>
                  handleNotificationToggle("emailNotifications")
                }
              />
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {t("pushNotifications")}
                  </p>
                  <p className="text-sm text-slate-500">
                    Receive push notifications on your device
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={() =>
                  handleNotificationToggle("pushNotifications")
                }
              />
            </div>

            {/* SMS Notifications */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {t("smsNotifications")}
                  </p>
                  <p className="text-sm text-slate-500">
                    Receive SMS notifications
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.smsNotifications}
                onCheckedChange={() =>
                  handleNotificationToggle("smsNotifications")
                }
              />
            </div>

            {/* Appointment Reminders */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {t("appointmentReminders")}
                  </p>
                  <p className="text-sm text-slate-500">
                    Get reminders for upcoming appointments
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.appointmentReminders}
                onCheckedChange={() =>
                  handleNotificationToggle("appointmentReminders")
                }
              />
            </div>

            {/* Patient Messages */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {t("patientMessages")}
                  </p>
                  <p className="text-sm text-slate-500">
                    Notifications for new patient messages
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.patientMessages}
                onCheckedChange={() =>
                  handleNotificationToggle("patientMessages")
                }
              />
            </div>

            {/* Reviews */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{t("reviews")}</p>
                  <p className="text-sm text-slate-500">
                    Get notified about new reviews
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.reviews}
                onCheckedChange={() => handleNotificationToggle("reviews")}
              />
            </div>

            {/* System Updates */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {t("systemUpdates")}
                  </p>
                  <p className="text-sm text-slate-500">
                    Receive system updates and announcements
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.systemUpdates}
                onCheckedChange={() =>
                  handleNotificationToggle("systemUpdates")
                }
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSettingsSave}
              className="bg-secondary hover:bg-secondary/90 text-white gap-2"
            >
              <Save className="h-4 w-4" />
              {t("saveSettings")}
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
