import { db } from '$lib/server/db';
import { profiles, type Profile } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function getProfile(userId: string): Promise<Profile> {
  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, userId),
  });

  if (!profile) {
    throw new Error('Profile not found');
  }

  return profile;
}

export async function updateProfile(
  userId: string,
  data: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>, // todo: check if we want to allow updating of email
): Promise<void> {
  await db.update(profiles).set(data).where(eq(profiles.id, userId));
}

export async function getUsers(): Promise<Profile[]> {
  return await db.query.profiles.findMany({
    orderBy: [desc(profiles.active), profiles.role, profiles.first_name, profiles.last_name],
  });
}
