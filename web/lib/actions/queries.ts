"use server";

import { db } from "@/lib/db";
import { dbProfiles, Profile } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getProfileById(id: string): Promise<Profile> {
  const profile = await db.query.dbProfiles.findFirst({
    where: eq(dbProfiles.id, id),
  });

  if (!profile) {
    throw new Error("Error fetching profile");
  }

  return profile;
}
