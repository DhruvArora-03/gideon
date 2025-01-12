import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface PageProps {
  className?: string;
  children: React.ReactNode;
  previousHref?: string;
  previousPageTitle?: string;
}
export default function PageWrapper(props: PageProps) {
  return (
    <main className={cn("min-h-screen h-full", props.className)}>
      {props.previousHref && (
        <Button className="absolute left-0 top-0" variant={"link"} asChild>
          <Link href={props.previousHref}>
            <ArrowLeft className="h-4 w-4" />
            {props.previousPageTitle
              ? `Back to ${props.previousPageTitle}`
              : "Back"}
          </Link>
        </Button>
      )}
      {props.children}
    </main>
  );
}
