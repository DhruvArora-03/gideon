import PageWrapper from "@/components/PageWrapper";
import ResetPassword from "@/components/ResetPassword";

export default function ChangePasswordPage() {
  return (
    <PageWrapper
      className="flex items-center justify-center"
      previousHref="/dashboard/settings"
      previousPageTitle="Settings"
    >
      <ResetPassword />
    </PageWrapper>
  );
}
