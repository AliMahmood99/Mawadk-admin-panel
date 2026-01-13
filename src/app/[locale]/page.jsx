import { redirect } from "next/navigation";

export default async function RootPage({ params }) {
  const { locale } = await params;
  // Redirect to admin login by default
  redirect(`/${locale}/admin/login`);
}
