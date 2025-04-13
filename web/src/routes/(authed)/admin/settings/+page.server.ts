import { updateDefaultSlotSchema } from '$lib/validation';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import queries from '$lib/server/db/queries';

export const load: PageServerLoad = async ({ depends }) => {
  depends('data:default-slots');

  return {
    defaultSlots: queries.getDefaultSlots(),
    form: await superValidate(zod(updateDefaultSlotSchema)),
  };
};

export const actions: Actions = {
  updateDefaultSlot: async (event) => {
    const form = await superValidate(event, zod(updateDefaultSlotSchema));

    if (!form.valid) {
      return message(form, 'Please fix the invalid fields', {
        status: 400,
      });
    }

    event.fetch(`/api/admin/default-slots/${form.data.defaultSlotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.data),
    });
  },
};
