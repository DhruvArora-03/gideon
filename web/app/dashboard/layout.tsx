import LogoutButton from "@/components/LogoutButton";
import SettingsButton from "@/components/SettingsButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    redirect("/login");
  }

  return (
    <div className="relative p-10">
      <div className="absolute top-0 right-0 flex gap-1">
        <SettingsButton />
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
