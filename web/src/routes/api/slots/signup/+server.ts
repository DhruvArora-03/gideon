import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { signUpForSlot } from '$lib/server/db/queries';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
  const { slotId, userId } = await request.json();

  await signUpForSlot(slotId, userId);

  return json({ success: true });
};
