"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/stores/authStore";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, LogOut, Globe, Search, Menu, ChevronDown, User2 } from "lucide-react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const router = useRouter();
  const { user, logout, userType } = useAuthStore();
  const t = useTranslations("common");
  const params = useParams();
  const currentLocale = params.locale;
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push(`/${userType}/login`);
  };

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    const pathParts = window.location.pathname.split("/");
    pathParts[1] = newLocale;
    window.location.href = pathParts.join("/");
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString(currentLocale === "ar" ? "ar-QA" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <header className="h-16 border-b border-border/50 bg-card/80 backdrop-blur-md px-6 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        {/* Welcome Message */}
        <div className="hidden md:block">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <span className="text-muted-foreground">👋</span>
            <span>
              {t("welcome")}, <span className="text-primary">{user?.name?.split(" ")[0]}</span>
            </span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {new Date().toLocaleDateString(currentLocale === "ar" ? "ar-QA" : "en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Search Bar - Modern Design */}
        <div className="hidden lg:flex items-center bg-muted/50 rounded-xl px-4 py-2 gap-3 min-w-[300px] hover:bg-muted/70 transition-colors group">
          <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <input
            type="text"
            placeholder={currentLocale === "ar" ? "بحث..." : "Search..."}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
          />
          <kbd className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground bg-muted rounded border border-border">
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Time Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-primary">{getCurrentTime()}</span>
        </div>

        {/* Language Switcher */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          className="relative rounded-xl hover:bg-muted/80 transition-all duration-300 hover:scale-105"
          title="Change Language"
        >
          <Globe className="w-5 h-5" />
          <span className="absolute -bottom-0.5 -right-0.5 text-[8px] font-bold bg-primary text-white px-1 rounded">
            {currentLocale.toUpperCase()}
          </span>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl hover:bg-muted/80 transition-all duration-300 hover:scale-105 group"
        >
          <Bell className="w-5 h-5 group-hover:animate-pulse" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
          </span>
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold"
          >
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all duration-300 border border-border/50 group"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <User2 className="w-5 h-5 text-white" />
            </div>

            {/* User Info */}
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-foreground leading-none">
                {user?.name}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 capitalize">
                {userType === "admin" ? "Super Admin" : userType}
              </div>
            </div>

            {/* Chevron */}
            <ChevronDown className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-300",
              showUserMenu && "rotate-180"
            )} />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-card rounded-xl shadow-xl border border-border/50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              {/* User Info Header */}
              <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
                    <User2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{user?.name}</div>
                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="p-2">
                <Button
                  onClick={() => {
                    setShowUserMenu(false);
                    handleLogout();
                  }}
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  {t("logout")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
