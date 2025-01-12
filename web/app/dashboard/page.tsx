import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { getProfileById } from "@/lib/actions/queries";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
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
    <PageWrapper>
      <Button variant={"link"} asChild>
        <Link href={"/dashboard/profile"}>Profile</Link>
      </Button>
      <p>you:</p>
      {Object.entries(profile).map(([key, value]) => (
        <p key={key}>
          {key}: {value.toString()}
        </p>
      ))}
    </PageWrapper>
  );
}
