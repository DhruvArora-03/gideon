create sequence "public"."default_slots_id_seq";

create table "public"."default_slots" (
    "id" integer not null default nextval('default_slots_id_seq'::regclass),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "start_time" time with time zone not null,
    "end_time" time with time zone not null,
    "capacity" integer not null
);


alter sequence "public"."default_slots_id_seq" owned by "public"."default_slots"."id";

CREATE UNIQUE INDEX default_slots_pkey ON public.default_slots USING btree (id);

alter table "public"."default_slots" add constraint "default_slots_pkey" PRIMARY KEY using index "default_slots_pkey";

grant delete on table "public"."default_slots" to "anon";

grant insert on table "public"."default_slots" to "anon";

grant references on table "public"."default_slots" to "anon";

grant select on table "public"."default_slots" to "anon";

grant trigger on table "public"."default_slots" to "anon";

grant truncate on table "public"."default_slots" to "anon";

grant update on table "public"."default_slots" to "anon";

grant delete on table "public"."default_slots" to "authenticated";

grant insert on table "public"."default_slots" to "authenticated";

grant references on table "public"."default_slots" to "authenticated";

grant select on table "public"."default_slots" to "authenticated";

grant trigger on table "public"."default_slots" to "authenticated";

grant truncate on table "public"."default_slots" to "authenticated";

grant update on table "public"."default_slots" to "authenticated";

grant delete on table "public"."default_slots" to "service_role";

grant insert on table "public"."default_slots" to "service_role";

grant references on table "public"."default_slots" to "service_role";

grant select on table "public"."default_slots" to "service_role";

grant trigger on table "public"."default_slots" to "service_role";

grant truncate on table "public"."default_slots" to "service_role";

grant update on table "public"."default_slots" to "service_role";


