import { db } from '$lib/server/db';
import type { Session } from '$lib/server/db/schema';

/**
 * Retrieves all future sessions with their unique user assignments for the provided user.
 *
 * For each session, fetches all assignments and filters to keep only one
 * assignment per user. Only returns sessions that start after the current time.
 *
 * @param {string} userId - The ID of the user to retrieve sessions for.
 * @param {number} year - The year to filter by
 * @param {number} month - The month to filter by
 * @returns {Promise<Session[]>} Array of future sessions, each containing their assignments filtered to one per user.
 */
export async function getSessions(userId: string, year: number, month: number): Promise<Session[]> {
  const sessions = await db.query.sessions.findMany({
    where: (sessions, { eq, and, between }) =>
      and(
        eq(sessions.user_id, userId),
        between(sessions.clock_in, new Date(year, month, 1), new Date(year, month + 1, 0)),
      ),
    orderBy: (sessions) => sessions.clock_in,
  });

  return sessions;
}
