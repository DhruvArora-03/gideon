create sequence "public"."slots_id_seq";

create table "public"."slots" (
    "id" integer not null default nextval('slots_id_seq'::regclass),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "date" date not null,
    "start_time" timestamp without time zone not null,
    "end_time" timestamp without time zone not null,
    "capacity" integer not null
);


alter table "public"."slots" enable row level security;

alter sequence "public"."slots_id_seq" owned by "public"."slots"."id";

CREATE UNIQUE INDEX slots_pkey ON public.slots USING btree (id);

alter table "public"."slots" add constraint "slots_pkey" PRIMARY KEY using index "slots_pkey";

grant delete on table "public"."slots" to "anon";

grant insert on table "public"."slots" to "anon";

grant references on table "public"."slots" to "anon";

grant select on table "public"."slots" to "anon";

grant trigger on table "public"."slots" to "anon";

grant truncate on table "public"."slots" to "anon";

grant update on table "public"."slots" to "anon";

grant delete on table "public"."slots" to "authenticated";

grant insert on table "public"."slots" to "authenticated";

grant references on table "public"."slots" to "authenticated";

grant select on table "public"."slots" to "authenticated";

grant trigger on table "public"."slots" to "authenticated";

grant truncate on table "public"."slots" to "authenticated";

grant update on table "public"."slots" to "authenticated";

grant delete on table "public"."slots" to "service_role";

grant insert on table "public"."slots" to "service_role";

grant references on table "public"."slots" to "service_role";

grant select on table "public"."slots" to "service_role";

grant trigger on table "public"."slots" to "service_role";

grant truncate on table "public"."slots" to "service_role";

grant update on table "public"."slots" to "service_role";

create policy "Anyone can view slots"
on "public"."slots"
as permissive
for select
to public;



