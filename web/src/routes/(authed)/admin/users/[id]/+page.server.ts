import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateUserInfoSchema } from '$lib/validation';
import queries from '$lib/server/db/queries';

export const load: PageServerLoad = async ({ params: { id } }) => {
  // supabase.auth.updateUser({
  //   email: 'dhruvarora@gmail.com',
  // });

  return {
    user: queries.getProfile(id),
    assignments: queries.getUpcomingAssignments(id),
    sessions: queries.getSessions(id),
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
