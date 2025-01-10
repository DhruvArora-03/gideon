"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData, captchaToken: string) {
  const supabase = await createClient();

  const { error, data: user } = await supabase.auth.signInWithPassword({
    // type-casting here for convenience
    // in practice, you should validate your inputs
    email: formData.get("email") as string,
    password: formData.get("password") as string,
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

export async function signup(
  formData: FormData,
  captchaToken: string,
  baseUrl: string
) {
  const supabase = await createClient();

  const { error, data: user } = await supabase.auth.signUp({
    // type-casting here for convenience
    // in practice, you should validate your inputs
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: { captchaToken, emailRedirectTo: baseUrl },
  });

  console.log("signup complete");
  console.log(user);
  console.log(error);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
