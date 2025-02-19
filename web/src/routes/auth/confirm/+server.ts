import type { EmailOtpType } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const token_hash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type') as EmailOtpType | null;
  const redirectTo = url.searchParams.get('redirect_to') ?? '/';

  /**
   * Clean up the redirect URL by deleting the Auth flow parameters.
   *
   * `next` is preserved for now, because it's needed in the error case.
   */
  const newUrl = new URL(url);
  newUrl.pathname = redirectTo;
  newUrl.searchParams.delete('token_hash');
  newUrl.searchParams.delete('type');

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      newUrl.searchParams.delete('redirect_to');
      redirect(303, newUrl);
    }
  }

  newUrl.pathname = '/auth/error';
  redirect(303, newUrl);
};
