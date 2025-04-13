alter table "public"."default_slots" alter column "end_time" set data type time without time zone using "end_time"::time without time zone;

alter table "public"."default_slots" alter column "start_time" set data type time without time zone using "start_time"::time without time zone;

alter table "public"."sessions" alter column "clock_in" set data type timestamp without time zone using "clock_in"::timestamp without time zone;

alter table "public"."sessions" alter column "clock_out" set data type timestamp without time zone using "clock_out"::timestamp without time zone;

alter table "public"."slots" alter column "end_time" set data type timestamp without time zone using "end_time"::timestamp without time zone;

alter table "public"."slots" alter column "start_time" set data type timestamp without time zone using "start_time"::timestamp without time zone;


