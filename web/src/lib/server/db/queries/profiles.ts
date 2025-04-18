import { db } from '$lib/server/db';
import type { Profile } from '$lib/server/db/schema';

export async function getProfile(userId: string): Promise<Profile> {
  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, userId),
  });

  if (!profile) {
    throw new Error('Profile not found');
  }

  return profile;
}

export async function getUsers(): Promise<Profile[]> {
  return await db.query.profiles.findMany({
    orderBy: (profiles) => [profiles.first_name, profiles.last_name],
  });
}
