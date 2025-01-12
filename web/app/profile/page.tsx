import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <PageWrapper>
      <h1>Profile</h1>
      <Button variant={"link"} asChild>
        <Link href={"/profile/change-password"}>Change Password</Link>
      </Button>
    </PageWrapper>
  );
}
