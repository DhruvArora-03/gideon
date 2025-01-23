drop policy "Users can view their own assignments" on "public"."assignments";

drop policy "Users can view their own profile" on "public"."profiles";

drop policy "Anyone can view slots" on "public"."slots";

alter table "public"."assignments" disable row level security;

alter table "public"."profiles" disable row level security;

alter table "public"."slots" disable row level security;


