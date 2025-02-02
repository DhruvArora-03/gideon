import { getSlots } from '$lib/server/db/queries.js';

export function load({ locals: { user }, depends }) {
  if (!user) throw new Error('User not found');

  depends('getSlots');

  return {
    slots: getSlots(),
  };
}
