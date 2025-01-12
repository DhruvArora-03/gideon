import { cn } from "@/lib/utils";

export interface PageProps {
  className?: string;
  children: React.ReactNode;
}
export default function PageWrapper(props: PageProps) {
  return (
    <main className={cn("min-h-screen h-full", props.className)}>
      {props.children}
    </main>
  );
}
