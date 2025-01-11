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

// export async function signup(
//   formData: FormData,
//   captchaToken: string,
//   baseUrl: string
// ) {
//   const supabase = await createClient();

//   const { error, data: user } = await supabase.auth.signUp({
//     // type-casting here for convenience
//     // in practice, you should validate your inputs
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//     options: { captchaToken, emailRedirectTo: baseUrl },
//   });

//   console.log("signup complete");
//   console.log(user);
//   console.log(error);

//   if (error) {
//     redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   redirect("/");
// }

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
