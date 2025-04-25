import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateUserInfoSchema } from '$lib/validation';
import queries from '$lib/server/db/queries';

export const load: PageServerLoad = async ({ params: { id }, url }) => {
  const today = new Date();
  const month = Number.parseInt(url.searchParams.get('month') ?? String(today.getMonth()));
  const year = Number.parseInt(url.searchParams.get('year') ?? String(today.getFullYear()));

  return {
    user: queries.getProfile(id),
    assignments: queries.getUpcomingAssignments(id),
    month,
    year,
    sessions: queries.getSessions(id, year, month),
    form: await superValidate(zod(updateUserInfoSchema)),
  };
};

export const actions: Actions = {
  invite: async (event) => {
    const form = await superValidate(event, zod(updateUserInfoSchema));

    if (!form.valid) {
      return message(form, 'Please fix the invalid fields', {
        status: 400,
      });
    }

    await event.fetch(`/api/admin/users/${event.params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.data),
    });

    return message(form, 'Updated user info!');
  },
};
