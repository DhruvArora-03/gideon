import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProfileById } from "@/lib/actions/queries";
import { createClient } from "@/lib/supabase/server";
import { LockKeyholeOpenIcon } from "lucide-react";
import Link from "next/link";
import { useId } from "react";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    throw new Error("User not found");
  }

  const profile = await getProfileById(user.id);
  console.log(profile);

  return (
    <PageWrapper
      className="space-y-4"
      previousHref="/dashboard"
      previousPageTitle="Dashboard"
    >
      <h1 className="text-4xl text-bold">Settings</h1>

      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>
            These account details are only editable by members of the admin
            team.
          </CardDescription>
        </CardHeader>
        <CardContent className="sm:grid sm:grid-cols-form sm:items-baseline space-y-2">
          <StaticField label="First Name" value={profile.first_name} />
          <StaticField label="Last Name" value={profile.last_name} />
          <StaticField label="Email" value={profile.email} />
          <StaticField label="Phone Number" value={profile.phone_number} />
        </CardContent>
      </Card>
      <Button asChild>
        <Link className="text-md" href={"/dashboard/settings/change-password"}>
          <LockKeyholeOpenIcon /> Change Password
        </Link>
      </Button>
    </PageWrapper>
  );
}

function StaticField(props: { label: string; value: string }) {
  const id = useId();

  return (
    <>
      <Label className="text-bold" htmlFor={id}>
        {props.label}
      </Label>
      <Input id={id} value={props.value} readOnly />
    </>
  );
}
