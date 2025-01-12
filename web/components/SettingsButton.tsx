"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";

export default function SettingsButton({ className }: { className?: string }) {
  return (
    <Button className={cn("", className)} variant="ghost" asChild>
      <Link href={"/dashboard/settings"}>
        <SettingsIcon />
        <span className="sr-only">Settings</span>
      </Link>
    </Button>
  );
}
