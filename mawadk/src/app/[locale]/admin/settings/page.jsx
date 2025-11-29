"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Bell,
  Lock,
  Globe,
  Mail,
  Palette,
  Database,
  Shield,
  CreditCard,
  Users,
  Building2,
  Save,
  RefreshCw,
  Moon,
  Sun,
  Check,
  AlertCircle
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SettingsPage() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();

  // General Settings State
  const [platformName, setPlatformName] = useState("Mawadk");
  const [platformEmail, setPlatformEmail] = useState("admin@mawadk.qa");
  const [platformPhone, setPlatformPhone] = useState("+974 4444 5555");

  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  // Security Settings State
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  // Appearance Settings State
  const [darkMode, setDarkMode] = useState(false);

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push("/admin/settings", { locale: newLocale });
  };

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully!");
  };

  const handleSaveSecurity = () => {
    toast.success("Security settings saved successfully!");
  };

  const handleSaveAppearance = () => {
    toast.success("Appearance settings saved successfully!");
  };

  return (
    <DashboardLayout requiredUserType="admin">
      <Toaster position="top-center" />

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Manage your platform settings and preferences</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Platform Status</CardTitle>
              <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Check className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
              Active
            </Badge>
            <p className="text-xs text-slate-500 mt-2">All systems operational</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Last Backup</CardTitle>
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">2h ago</div>
            <p className="text-xs text-slate-500 mt-1">Next in 22 hours</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Security Score</CardTitle>
              <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">98%</div>
            <p className="text-xs text-green-600 mt-1">Excellent security</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Active Sessions</CardTitle>
              <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">1,542</div>
            <p className="text-xs text-slate-500 mt-1">Current users online</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your platform general information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                placeholder="Mawadk"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platformEmail">Platform Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="platformEmail"
                  type="email"
                  value={platformEmail}
                  onChange={(e) => setPlatformEmail(e.target.value)}
                  placeholder="admin@mawadk.qa"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="platformPhone">Platform Phone</Label>
              <Input
                id="platformPhone"
                value={platformPhone}
                onChange={(e) => setPlatformPhone(e.target.value)}
                placeholder="+974 4444 5555"
              />
            </div>
            <Separator className="my-4" />
            <Button onClick={handleSaveGeneral} className="w-full gap-2">
              <Save className="h-4 w-4" />
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure your notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium text-sm text-slate-900">Email Notifications</p>
                  <p className="text-xs text-slate-500">Receive notifications via email</p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? "bg-primary" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium text-sm text-slate-900">SMS Notifications</p>
                  <p className="text-xs text-slate-500">Receive notifications via SMS</p>
                </div>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  smsNotifications ? "bg-primary" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    smsNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium text-sm text-slate-900">Push Notifications</p>
                  <p className="text-xs text-slate-500">Receive browser notifications</p>
                </div>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  pushNotifications ? "bg-primary" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    pushNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <Separator className="my-4" />
            <Button onClick={handleSaveNotifications} className="w-full gap-2">
              <Save className="h-4 w-4" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your security and privacy</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium text-sm text-slate-900">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add extra security layer</p>
                </div>
              </div>
              <button
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorAuth ? "bg-primary" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorAuth ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                placeholder="30"
              />
              <p className="text-xs text-slate-500">Auto logout after inactivity</p>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-amber-900">Password Policy</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Minimum 8 characters, include uppercase, lowercase, numbers and symbols
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />
            <Button onClick={handleSaveSecurity} className="w-full gap-2">
              <Save className="h-4 w-4" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-pink-50 rounded-lg flex items-center justify-center">
                <Palette className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize your platform appearance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="h-5 w-5 text-slate-600" /> : <Sun className="h-5 w-5 text-slate-600" />}
                <div>
                  <p className="font-medium text-sm text-slate-900">Dark Mode</p>
                  <p className="text-xs text-slate-500">Toggle dark theme</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? "bg-primary" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium text-sm text-slate-900">Language</p>
                  <p className="text-xs text-slate-500">Current: {locale === "en" ? "English" : "العربية"}</p>
                </div>
              </div>
              <Button onClick={switchLanguage} variant="outline" size="sm">
                Switch to {locale === "en" ? "العربية" : "English"}
              </Button>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-3">
                <Palette className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-blue-900">Theme Colors</p>
                  <div className="flex gap-2 mt-2">
                    <div className="w-8 h-8 rounded-lg bg-primary border-2 border-white shadow-sm"></div>
                    <div className="w-8 h-8 rounded-lg bg-secondary border-2 border-white shadow-sm"></div>
                    <div className="w-8 h-8 rounded-lg bg-accent border-2 border-white shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />
            <Button onClick={handleSaveAppearance} className="w-full gap-2">
              <Save className="h-4 w-4" />
              Save Appearance Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Actions */}
      <Card className="border-slate-200 mt-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center">
              <Database className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <CardTitle>System Actions</CardTitle>
              <CardDescription>Manage system maintenance and data</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <Database className="h-6 w-6 text-blue-600" />
              <span className="font-semibold">Backup Database</span>
              <span className="text-xs text-slate-500">Create a full backup</span>
            </Button>

            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <RefreshCw className="h-6 w-6 text-green-600" />
              <span className="font-semibold">Clear Cache</span>
              <span className="text-xs text-slate-500">Refresh system cache</span>
            </Button>

            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <Shield className="h-6 w-6 text-purple-600" />
              <span className="font-semibold">Security Audit</span>
              <span className="text-xs text-slate-500">Run security check</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
