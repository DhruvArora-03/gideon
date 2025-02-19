import type { Actions, PageServerLoad } from './$types';
import { inviteUserByEmail } from '$lib/server/supabase';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { inviteFormSchema } from '$lib/validation';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(inviteFormSchema)),
  };
};

export const actions: Actions = {
  invite: async (event) => {
    const form = await superValidate(event, zod(inviteFormSchema));
    console.log(form.data);
    console.log(`Inviting user: ${form.data.email}`);

    if (!form.valid) {
      return message(form, 'Please fix the invalid fields', {
        status: 400,
      });
    }

    const { error } = await inviteUserByEmail(form.data);
    if (error) {
      console.error(error);
      return message(form, `Something went wrong, could not invite ${form.data.email}`, {
        status: 500,
      });
    }

    return message(form, `Invite sent to ${form.data.email}`);
  },
};
