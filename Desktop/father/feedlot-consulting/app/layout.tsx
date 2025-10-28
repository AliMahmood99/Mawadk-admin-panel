import type { Metadata } from "next";
import { locales } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Feedlot Management Consulting | Operational Excellence",
  description: "Transform your farm operations with advanced management systems, performance optimization, and strategic consulting from a proven industry expert with 31+ years of experience.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
