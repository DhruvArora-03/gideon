alter table "public"."slots" add column "date" date not null;

alter table "public"."slots" alter column "end_time" set data type time without time zone using "end_time"::time without time zone;

alter table "public"."slots" alter column "start_time" set data type time without time zone using "start_time"::time without time zone;


