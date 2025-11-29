"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/stores/authStore";
import { useParams } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children, requiredUserType }) {
  const router = useRouter();
  const { isAuthenticated, userType } = useAuthStore();
  const params = useParams();
  const locale = params.locale;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${requiredUserType}/login`);
    } else if (userType !== requiredUserType) {
      // Redirect to correct dashboard if user type doesn't match
      router.push(`/${userType}/dashboard`);
    }
  }, [isAuthenticated, userType, requiredUserType, router]);

  if (!isAuthenticated || userType !== requiredUserType) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar userType={userType} locale={locale} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
