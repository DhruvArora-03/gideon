alter type "public"."assignment_status" rename to "assignment_status__old_version_to_be_dropped";

create type "public"."assignment_status" as enum ('confirmed', 'waitlisted');

alter table "public"."assignments" alter column assignment_status type "public"."assignment_status" using assignment_status::text::"public"."assignment_status";

drop type "public"."assignment_status__old_version_to_be_dropped";


