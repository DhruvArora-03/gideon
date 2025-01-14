alter table "public"."assignments" alter column "slot_id" set not null;

alter table "public"."assignments" add constraint "assignments_user_id_profiles_id_fk" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."assignments" validate constraint "assignments_user_id_profiles_id_fk";


