import { AuthError, createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SERVICE_ROLE_KEY } from '$env/static/private';
import type { InviteFormSchema } from '$lib/validation';

const createAdminClient = async () => {
  return createClient(PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY);
};

// TODO: stronger typing here on data
export async function inviteUserByEmail(
  baseUrl: string,
  user: InviteFormSchema,
): Promise<{ error: AuthError | null }> {
  const { email, ...userData } = user;

  const supabase = await createAdminClient();
  const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${baseUrl}/dashboard/settings/change-password`,
    data: userData,
  });

  return {
    error,
  };
}
