import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginFormSchema } from '$lib/validation';

export const load = async () => {
  return {
    form: await superValidate(zod(loginFormSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    console.log('REACHED');
    const form = await superValidate(event, zod(loginFormSchema));
    console.log(form.data);
    console.log(`Logging in user: ${form.data.email}`);

    if (!form.valid) {
      return message(form, 'Please fix the invalid fields', {
        status: 400,
      });
    }

    const { error } = await event.locals.supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password,
      options: { captchaToken: form.data['cf-turnstile-response'] },
    });

    if (error) {
      console.error(error);
      return message(form, 'Invalid email or password', {
        status: 500,
      });
    }

    redirect(303, '/home');
  },
};
