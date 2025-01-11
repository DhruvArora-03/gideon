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

  revalidatePath("/", "layout");
  redirect("/");
}

export async function invite(baseUrl: string, values: InviteFormSchema) {
  const { email, ...userData } = values;

  console.log(`Inviting user: ${email}`);

  const supabase = await createAdminClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: baseUrl,
    data: userData,
  });

  if (!user || error) {
    console.error(error);
    throw new Error("Error inviting user");
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
