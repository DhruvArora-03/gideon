import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <PageWrapper previousHref="/dashboard" previousPageTitle="Dashboard">
      <h1 className="text-2xl">Profile</h1>
      <Button asChild>
        <Link className="text-md" href={"/dashboard/profile/change-password"}>
          Change Password
        </Link>
      </Button>
    </PageWrapper>
  );
}
