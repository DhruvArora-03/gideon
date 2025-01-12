"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InviteFormSchema, LoginFormSchema } from "@/lib/validation";
import { createAdminClient } from "@/lib/supabase/admin";

export async function login(values: LoginFormSchema, captchaToken: string) {
  const supabase = await createClient();

  const { error, data: user } = await supabase.auth.signInWithPassword({
    ...values,
    options: { captchaToken },
  });

  console.log("login complete");
  console.log(user);
  console.log(error);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  // redirect handled in dashboard layout - checks if user is logged in
}

export async function invite(baseUrl: string, values: InviteFormSchema) {
  const { email, ...userData } = values;

  console.log(`Inviting user: ${email}`);

  const supabase = await createAdminClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${baseUrl}/dashboard/settings/change-password`,
    data: userData,
  });

  if (!user || error) {
    console.error(error);
    throw new Error("Error inviting user");
  }
}

export async function resetPassword(password: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({ password });

  if (!user || error) {
    console.error(error);
    throw new Error("Error resetting password");
  }
}

export async function deleteUser(id: string) {
  const supabase = await createAdminClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.deleteUser(id);

  if (!user || error) {
    console.error(error);
  }

  console.log(user);
}
