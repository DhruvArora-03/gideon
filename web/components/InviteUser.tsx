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
  FormField,
  FormItem,
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
    },
  });

  const onSubmit = useCallback(
    (values: InviteFormSchema) => invite(values.email),
    []
  );

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Invite User</CardTitle>
        <CardDescription>
          New users can be invited with their email address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      autoComplete="none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Send /> Send
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
