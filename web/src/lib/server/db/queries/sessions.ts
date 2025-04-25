import { db } from '$lib/server/db';
import type { Session } from '$lib/server/db/schema';

export async function getSessions(
  userId: string,
  year?: number,
  month?: number,
): Promise<Session[]> {
  const sessions = await db.query.sessions.findMany({
    where: (sessions, { eq, and, between }) =>
      year && month
        ? and(
            eq(sessions.user_id, userId),
            between(sessions.clock_in, new Date(year, month, 1), new Date(year, month + 1, 0)),
          )
        : eq(sessions.user_id, userId),
    orderBy: (sessions) => sessions.clock_in,
  });

  return sessions;
}
