import LogoutButton from "@/components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-10">
      <LogoutButton className="absolute top-0 right-0" />
      {children}
    </div>
  );
}
