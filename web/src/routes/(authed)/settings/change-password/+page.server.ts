import { changePasswordFormSchema } from '$lib/validation';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(changePasswordFormSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(changePasswordFormSchema));

    if (!form.valid) {
      return message(form, 'Please fix the invalid fields', {
        status: 400,
      });
    }

    const { error } = await event.locals.supabase.auth.updateUser({
      password: form.data.new_password,
    });

    if (error) {
      console.error(error);
      return message(form, 'Something went wrong. Please try again later.', {
        status: 500,
      });
    }

    redirect(303, '/home');
  },
};
