"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { LoginFormSchema } from "@/lib/validation";

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

export async function invite(email: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.inviteUserByEmail(email);

  if (!user || error) {
    console.error(error);
  }

  console.log(user);
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
