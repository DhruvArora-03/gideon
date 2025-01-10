"use client";

import { login, signup } from "@/app/login/actions";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

export default function LoginPage() {
  const [captchaToken, setCaptchaToken] = useState<string>();

  return (
    <form className="[&>div>input]:text-black flex flex-col gap-4 p-10 [&>button]:border-2 border-white w-full">
      <div className="grid grid-cols-[1fr,3fr]">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-[1fr,3fr]">
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
      </div>
      <button
        formAction={
          captchaToken && ((formData) => login(formData, captchaToken))
        }
      >
        Log in
      </button>
      <button
        formAction={
          captchaToken && ((formData) => signup(formData, captchaToken))
        }
      >
        Sign up
      </button>
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setCaptchaToken(token)}
      />
    </form>
  );
}
