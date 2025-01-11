"use client";

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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { invite } from "@/lib/actions/auth";
import { InviteFormSchema, inviteFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export default function InviteWidget() {
  const form = useForm<InviteFormSchema>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  const onSubmit = useCallback(async (values: InviteFormSchema) => {
    form.reset();
    await invite(window.location.origin, values);
  }, []);

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Invite User</CardTitle>
        <CardDescription>
          New users can be configured here and invited with their email address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-[1fr,2fr] items-baseline space-y-2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        autoComplete="none"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormDescription className="hidden">
                    The new user's first name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-[1fr,2fr] items-baseline space-y-2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" autoComplete="none" {...field} />
                    </FormControl>
                  </div>
                  <FormDescription className="hidden">
                    The new user's last name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-[1fr,2fr] items-baseline space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@example.com"
                        autoComplete="none"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormDescription className="hidden">
                    The new user's email address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-[1fr,2fr] items-baseline space-y-2">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="phone_number"
                        placeholder="123-456-7890"
                        autoComplete="none"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormDescription className="hidden">
                    The new user's phone number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4" type="submit">
              <Send /> Send Invite Email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
