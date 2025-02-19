import { db } from '$lib/server/db';
import type { Profile } from '$lib/server/db/schema';

/**
 * Retrieves profile for a specific user.
 *
 * Uses the user's ID to fetch the user's profile information.
 *
 * @returns {Promise<Profile>} The user's profile
 */
export async function getProfile(userId: string): Promise<Profile> {
  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, userId),
  });

  if (!profile) {
    throw new Error('Profile not found');
  }

  return profile;
}
