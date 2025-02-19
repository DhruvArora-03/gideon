create type "public"."user_role" as enum ('admin', 'manager', 'employee');

alter table "public"."profiles" add column "role" user_role not null default 'employee'::user_role;


