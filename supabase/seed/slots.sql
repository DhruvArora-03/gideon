alter sequence "public"."slots_id_seq" start with 1000;
alter sequence "public"."slots_id_seq" restart;

INSERT INTO "public"."slots" ("id", "start_time", "end_time", "capacity")
VALUES
(1, (now()::timestamp::date + interval'01 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'02 day' + interval'1.5 hours')::timestamp, 8),
(2, (now()::timestamp::date + interval'02 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'03 day' + interval'1.5 hours')::timestamp, 8),
(3, (now()::timestamp::date + interval'03 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'04 day' + interval'1.5 hours')::timestamp, 8),
(4, (now()::timestamp::date + interval'04 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'05 day' + interval'1.5 hours')::timestamp, 8),
(5, (now()::timestamp::date + interval'05 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'06 day' + interval'1.5 hours')::timestamp, 8),
(6, (now()::timestamp::date + interval'06 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'07 day' + interval'1.5 hours')::timestamp, 8),
(7, (now()::timestamp::date + interval'07 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'08 day' + interval'1.5 hours')::timestamp, 8);
