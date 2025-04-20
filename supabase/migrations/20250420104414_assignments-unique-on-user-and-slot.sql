CREATE UNIQUE INDEX assignments_user_id_slot_id_unique ON public.assignments USING btree (user_id, slot_id);

alter table "public"."assignments" add constraint "assignments_user_id_slot_id_unique" UNIQUE using index "assignments_user_id_slot_id_unique";


