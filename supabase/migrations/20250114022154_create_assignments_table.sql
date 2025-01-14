create sequence "public"."assignments_id_seq";

create table "public"."assignments" (
    "id" integer not null default nextval('assignments_id_seq'::regclass),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "slot_id" integer,
    "assignment_status" assignment_status not null
);


alter table "public"."assignments" enable row level security;

alter sequence "public"."assignments_id_seq" owned by "public"."assignments"."id";

CREATE UNIQUE INDEX assignments_pkey ON public.assignments USING btree (id);

alter table "public"."assignments" add constraint "assignments_pkey" PRIMARY KEY using index "assignments_pkey";

alter table "public"."assignments" add constraint "assignments_slot_id_slots_id_fk" FOREIGN KEY (slot_id) REFERENCES slots(id) ON DELETE CASCADE not valid;

alter table "public"."assignments" validate constraint "assignments_slot_id_slots_id_fk";

grant delete on table "public"."assignments" to "anon";

grant insert on table "public"."assignments" to "anon";

grant references on table "public"."assignments" to "anon";

grant select on table "public"."assignments" to "anon";

grant trigger on table "public"."assignments" to "anon";

grant truncate on table "public"."assignments" to "anon";

grant update on table "public"."assignments" to "anon";

grant delete on table "public"."assignments" to "authenticated";

grant insert on table "public"."assignments" to "authenticated";

grant references on table "public"."assignments" to "authenticated";

grant select on table "public"."assignments" to "authenticated";

grant trigger on table "public"."assignments" to "authenticated";

grant truncate on table "public"."assignments" to "authenticated";

grant update on table "public"."assignments" to "authenticated";

grant delete on table "public"."assignments" to "service_role";

grant insert on table "public"."assignments" to "service_role";

grant references on table "public"."assignments" to "service_role";

grant select on table "public"."assignments" to "service_role";

grant trigger on table "public"."assignments" to "service_role";

grant truncate on table "public"."assignments" to "service_role";

grant update on table "public"."assignments" to "service_role";

create policy "Users can view their own assignments"
on "public"."assignments"
as permissive
for select
to public;



