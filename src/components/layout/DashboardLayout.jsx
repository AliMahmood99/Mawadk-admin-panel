"use client";

import { useEffect, useState } from "react";
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
  const [isClient, setIsClient] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      router.replace(`/${requiredUserType}/login`);
    } else if (isClient && isAuthenticated && userType !== requiredUserType) {
      // Redirect to correct dashboard if user type doesn't match
      router.replace(`/${userType}/dashboard`);
    }
  }, [isClient, isAuthenticated, userType, requiredUserType, router]);

  // Show loading or nothing while checking auth on client
  if (!isClient) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || userType !== requiredUserType) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
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
