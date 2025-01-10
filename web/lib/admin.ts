import { NextRequest, NextResponse } from "next/server";

export function isUnauthorizedAdminRoute(path: string): boolean {
  // TODO: protect routes
  return path.startsWith("/admin") ? false : false;
}
