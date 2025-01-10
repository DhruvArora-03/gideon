import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    return <p>you are not logged in</p>;
  }

  return (
    <div>
      <p>you:</p>
      <div>
        {Object.keys(user).map((key) => (
          <p key={key}>
            {key}: {(user as any)[key]}
          </p>
        ))}
      </div>
    </div>
  );
}
