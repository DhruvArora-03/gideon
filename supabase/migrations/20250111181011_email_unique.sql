CREATE UNIQUE INDEX profiles_email_unique ON public.profiles USING btree (email);

alter table "public"."profiles" add constraint "profiles_email_unique" UNIQUE using index "profiles_email_unique";


