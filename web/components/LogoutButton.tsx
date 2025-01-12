"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <Button
      className={cn("", className)}
      onClick={async () => {
        await logout();
        redirect("/login");
      }}
    >
      Logout
    </Button>
  );
}
