alter table "public"."slots" alter column "end_time" set data type timestamp with time zone using "end_time"::timestamp with time zone;

alter table "public"."slots" alter column "start_time" set data type timestamp with time zone using "start_time"::timestamp with time zone;


