import queries from '$lib/server/db/queries';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { UpdateAccountDetailsSchema } from '$lib/validation';

export const PUT: RequestHandler = async ({ request, params }) => {
  const id = Number.parseInt(params.id);
  const { first_name, last_name, email, phone_number, role }: UpdateAccountDetailsSchema =
    await request.json();

  await queries.updateProfile(id, { first_name, last_name, email, phone_number, role });

  return text('');
};
