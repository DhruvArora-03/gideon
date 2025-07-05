import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateAccountDetailsSchema } from '$lib/validation';
import queries from '$lib/server/db/queries';

export const load: PageServerLoad = async ({ params: { id }, url }) => {
  const today = new Date();
  const month = Number.parseInt(url.searchParams.get('month') ?? String(today.getMonth()));
  const year = Number.parseInt(url.searchParams.get('year') ?? String(today.getFullYear()));

  return {
    userInfo: queries.getProfile(id),
    assignments: queries.getUpcomingAssignments(id),
    month,
    year,
    sessions: queries.getSessions(id, year, month),
    form: await superValidate(zod(updateAccountDetailsSchema)),
  };
};

export const actions: Actions = {
  updateAccountDetails: async (event) => {
    const form = await superValidate(event, zod(updateAccountDetailsSchema));

    if (!form.valid) {
      return message(form, 'Please fix the invalid fields', {
        status: 400,
      });
    }

    // await queries.updateProfile(event.params.id, form.data);

    await event.fetch(`/api/admin/users/${event.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.data),
    });

    return { success: true };
  },
};
