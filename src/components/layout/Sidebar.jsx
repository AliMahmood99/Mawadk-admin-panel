"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  Stethoscope,
  Calendar,
  Settings,
  Star,
  Wallet,
  FileText,
  UserCircle,
  ClipboardList,
  ChevronRight,
  Sparkles,
  Sliders,
  MapPin,
  Bell,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Sidebar({ userType, locale }) {
  const pathname = usePathname();
  const t = useTranslations("sidebar");
  const [hoveredItem, setHoveredItem] = useState(null);

  const adminNavigation = [
    {
      name: t("dashboard"),
      href: `/${locale}/admin/dashboard`,
      icon: LayoutDashboard,
      color: "text-primary",
      bgColor: "bg-primary/10",
      badge: null,
    },
    {
      name: t("users"),
      href: `/${locale}/admin/users`,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      badge: null,
    },
    {
      name: t("hospitals"),
      href: `/${locale}/admin/hospitals`,
      icon: Building2,
      color: "text-secondary",
      bgColor: "bg-pink-50",
      badge: null,
    },
    {
      name: t("doctors"),
      href: `/${locale}/admin/doctors`,
      icon: Stethoscope,
      color: "text-accent",
      bgColor: "bg-green-50",
      badge: null,
    },
    {
      name: t("appointments"),
      href: `/${locale}/admin/appointments`,
      icon: Calendar,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      badge: null,
    },
    {
      name: t("reviews"),
      href: `/${locale}/admin/reviews`,
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      badge: null,
    },
    {
      name: t("sliders"),
      href: `/${locale}/admin/sliders`,
      icon: Sliders,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      badge: null,
    },
    {
      name: t("cities"),
      href: `/${locale}/admin/cities`,
      icon: MapPin,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
      badge: null,
    },
    {
      name: t("notifications"),
      href: `/${locale}/admin/notifications`,
      icon: Bell,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      badge: null,
    },
    {
      name: t("settings"),
      href: `/${locale}/admin/settings`,
      icon: Settings,
      color: "text-slate-500",
      bgColor: "bg-slate-50",
      badge: null,
    },
  ];

  const hospitalNavigation = [
    {
      name: t("dashboard"),
      href: `/${locale}/hospital/dashboard`,
      icon: LayoutDashboard,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      name: t("doctors"),
      href: `/${locale}/hospital/doctors`,
      icon: Stethoscope,
      color: "text-accent",
      bgColor: "bg-green-50",
      badge: null,
    },
    {
      name: t("appointments"),
      href: `/${locale}/hospital/appointments`,
      icon: Calendar,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      badge: null,
    },
    {
      name: t("reviews"),
      href: `/${locale}/hospital/reviews`,
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      name: t("profile"),
      href: `/${locale}/hospital/profile`,
      icon: UserCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: t("settings"),
      href: `/${locale}/hospital/settings`,
      icon: Settings,
      color: "text-slate-500",
      bgColor: "bg-slate-50",
    },
  ];

  const doctorNavigation = [
    {
      name: t("dashboard"),
      href: `/${locale}/doctor/dashboard`,
      icon: LayoutDashboard,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      name: t("appointments"),
      href: `/${locale}/doctor/appointments`,
      icon: Calendar,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      badge: null,
    },
    {
      name: t("patients"),
      href: `/${locale}/doctor/patients`,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      badge: null,
    },
    {
      name: t("schedule"),
      href: `/${locale}/doctor/schedule`,
      icon: ClipboardList,
      color: "text-teal-500",
      bgColor: "bg-teal-50",
    },
    {
      name: t("reviews"),
      href: `/${locale}/doctor/reviews`,
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      name: t("earnings"),
      href: `/${locale}/doctor/earnings`,
      icon: Wallet,
      color: "text-accent",
      bgColor: "bg-green-50",
    },
    {
      name: t("profile"),
      href: `/${locale}/doctor/profile`,
      icon: UserCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: t("settings"),
      href: `/${locale}/doctor/settings`,
      icon: Settings,
      color: "text-slate-500",
      bgColor: "bg-slate-50",
    },
  ];

  const navigation =
    userType === "admin"
      ? adminNavigation
      : userType === "hospital"
        ? hospitalNavigation
        : doctorNavigation;

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-card to-muted/20 border-r border-border/50 shadow-sm">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-border/50 px-6 bg-card/80 backdrop-blur-sm">
        <Link
          href={`/${locale}/${userType}/dashboard`}
          className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:rotate-3">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Mawadk
          </span>
        </Link>
      </div>

      {/* User Badge */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-3 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary">
              {userType === "admin" ? "Super Admin" : userType === "hospital" ? "Hospital Panel" : "Doctor Panel"}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground">Full Access</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredItem === item.name;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden",
                isActive
                  ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full animate-pulse" />
              )}

              {/* Icon Container */}
              <div className={cn(
                "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300",
                isActive
                  ? "bg-white/20"
                  : isHovered
                    ? `${item.bgColor} ${item.color}`
                    : "bg-transparent"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive && "scale-110",
                  isHovered && !isActive && "scale-110"
                )} />
              </div>

              {/* Text */}
              <span className={cn(
                "flex-1 transition-all duration-300",
                isActive && "font-semibold",
                isHovered && !isActive && "translate-x-1"
              )}>
                {item.name}
              </span>

              {/* Badge */}
              {item.badge && (
                <Badge
                  variant={isActive ? "secondary" : "outline"}
                  className={cn(
                    "h-5 px-2 text-[10px] font-bold transition-all duration-300",
                    isActive && "bg-white/20 text-white border-white/30",
                    !isActive && "bg-muted text-muted-foreground"
                  )}
                >
                  {item.badge}
                </Badge>
              )}

              {/* Chevron */}
              <ChevronRight className={cn(
                "w-4 h-4 transition-all duration-300",
                isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              )} />

              {/* Hover Gradient Background */}
              {!isActive && (
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent -translate-x-full transition-transform duration-500",
                  isHovered && "translate-x-full"
                )} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/50 p-4 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-medium">© 2025 Mawadk</span>
        </div>
        <p className="text-center text-[10px] text-muted-foreground/60 mt-1">
          Healthcare Platform
        </p>
      </div>
    </div>
  );
}
