"use client";

import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { resetPassword } from "@/lib/actions/auth";
import {
  resetPasswordFormSchema,
  ResetPasswordFormSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      new_password: "",
      confirm_new_password: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormSchema) => {
    form.reset();
    await resetPassword(values.new_password);
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Minimum 8 characters. Must use uppercase, lowercase, number, and
          special characters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <div className="sm:grid sm:grid-cols-form sm:items-baseline space-y-2">
                    <FormLabel className="text-bold">Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="New Password" {...field} />
                    </FormControl>
                  </div>
                  <FormDescription className="sr-only">
                    Your new password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_new_password"
              render={({ field }) => (
                <FormItem>
                  <div className="sm:grid sm:grid-cols-form sm:items-baseline space-y-2">
                    <FormLabel className="text-bold">Repeat</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Repeat New Password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormDescription className="sr-only">
                    Repeat your new password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-4 " type="submit">
              Confirm New Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
