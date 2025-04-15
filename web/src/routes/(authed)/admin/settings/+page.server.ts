import queries from '$lib/server/db/queries';
import { createDefaultSlotSchema, updateDefaultSlotSchema } from '$lib/validation';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
  depends('data:default-slots');

  return {
    defaultSlots: queries.getDefaultSlots(),
    form: await superValidate(zod(updateDefaultSlotSchema)),
  };
};

export const actions: Actions = {
  createDefaultSlot: async (event) => {
    const form = await superValidate(event, zod(createDefaultSlotSchema));

    if (!form.valid) {
      return message(form, 'Please fix the invalid fields', {
        status: 400,
      });
    }

    event.fetch(`/api/admin/default-slots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.data),
    });
  },
  updateDefaultSlot: async (event) => {
    const form = await superValidate(event, zod(updateDefaultSlotSchema));

    if (!form.valid) {
      return message(form, 'Please fix the invalid fields', {
        status: 400,
      });
    }

    const { defaultSlotId, ...body } = form.data;

    event.fetch(`/api/admin/default-slots/${defaultSlotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },
  deleteDefaultSlot: async (event) => {
    const form = await superValidate(event, zod(updateDefaultSlotSchema));

    if (!form.valid) {
      return message(form, 'Please fix the invalid fields', {
        status: 400,
      });
    }

    const { defaultSlotId } = form.data;

    event.fetch(`/api/admin/default-slots/${defaultSlotId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
