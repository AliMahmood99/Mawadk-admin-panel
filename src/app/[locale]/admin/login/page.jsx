"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Lock, Loader2, Stethoscope, Globe, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuthStore();

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push("/admin/login", { locale: newLocale });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(tCommon("required"));
      return;
    }

    const result = await login({
      email,
      password,
      userType: "admin",
    });

    if (result.success) {
      toast.success(t("loginSuccess"));
      router.push("/admin/users");
    } else {
      toast.error(result.message || t("loginFailed"));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <Toaster position="top-center" />

      {/* Animated Background */}
      <div className="absolute inset-0 medical-gradient">
        {/* Animated Circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Language Switcher */}
      <button
        onClick={switchLanguage}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl text-white transition-all duration-300 border border-white/20 hover:scale-105"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{locale === "en" ? "العربية" : "English"}</span>
      </button>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">

        {/* Left Side - Branding */}
        <div className="hidden md:block text-white space-y-8">
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Mawadk</h1>
                <p className="text-white/80 text-sm">Healthcare Management Platform</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 mt-12">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Secure Admin Access</h3>
                  <p className="text-white/70 text-sm">Complete control over your healthcare platform with enterprise-grade security</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Real-time Analytics</h3>
                  <p className="text-white/70 text-sm">Monitor hospitals, doctors, and appointments with live dashboards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Glassmorphism Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-white text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t("adminLogin")}</h2>
              <p className="text-white/90 text-sm">{t("loginToAccount")}</p>
            </div>

            {/* Form */}
            <div className="p-8">
              {/* Demo Credentials */}
              <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="font-semibold text-sm text-primary">
                    {locale === "ar" ? "بيانات الدخول" : "Login Credentials"}
                  </p>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong>{tCommon("email")}:</strong> admin@gmail.com</p>
                  <p><strong>{tCommon("password")}:</strong> 12345678</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">{tCommon("email")}</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-muted/50 border-muted focus:border-primary focus:ring-primary/20"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">{tCommon("password")}</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 bg-muted/50 border-muted focus:border-primary focus:ring-primary/20"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      {tCommon("loading")}
                    </>
                  ) : (
                    <>
                      {t("login")}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-muted-foreground font-medium">
                    {locale === "ar" ? "أو تسجيل الدخول كـ" : "Or login as"}
                  </span>
                </div>
              </div>

              {/* Other Login Options */}
              <div className="grid grid-cols-2 gap-3">
                <Link href="/hospital/login">
                  <Button
                    variant="outline"
                    className="w-full h-11 border-2 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300"
                  >
                    {locale === "ar" ? "مستشفى" : "Hospital"}
                  </Button>
                </Link>
                <Link href="/doctor/login">
                  <Button
                    variant="outline"
                    className="w-full h-11 border-2 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300"
                  >
                    {locale === "ar" ? "طبيب" : "Doctor"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-white/80 text-sm mt-6">
            © 2025 Mawadk. {locale === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}
          </p>
        </div>
      </div>
    </div>
  );
}
