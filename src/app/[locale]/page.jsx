import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect to admin login by default
  redirect("/admin/login");
}
