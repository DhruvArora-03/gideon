"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <Button
      className={cn("", className)}
      variant="secondary"
      onClick={() => {
        logout();
      }}
    >
      Logout
    </Button>
  );
}
