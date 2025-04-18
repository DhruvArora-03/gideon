alter table "public"."assignments" drop constraint "assignments_slot_id_slots_id_fk";

alter table "public"."assignments" drop constraint "assignments_user_id_profiles_id_fk";

alter table "public"."profiles" drop constraint "profiles_id_users_id_fk";

alter table "public"."sessions" drop constraint "sessions_user_id_profiles_id_fk";

alter table "public"."assignments" add constraint "assignments_slot_id_slots_id_fk" FOREIGN KEY (slot_id) REFERENCES slots(id) not valid;

alter table "public"."assignments" validate constraint "assignments_slot_id_slots_id_fk";

alter table "public"."assignments" add constraint "assignments_user_id_profiles_id_fk" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."assignments" validate constraint "assignments_user_id_profiles_id_fk";

alter table "public"."profiles" add constraint "profiles_id_users_id_fk" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_users_id_fk";

alter table "public"."sessions" add constraint "sessions_user_id_profiles_id_fk" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."sessions" validate constraint "sessions_user_id_profiles_id_fk";


