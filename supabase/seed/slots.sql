alter sequence "public"."slots_id_seq" start with 1000;
alter sequence "public"."slots_id_seq" restart;

INSERT INTO "public"."slots" ("id", "date", "start_time", "end_time", "capacity")
VALUES
(1, (now()::timestamp::date + interval'1 day')::date, (now()::timestamp::date + interval'1 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'1 day' + interval'4 hours')::timestamp, 8),
(2, (now()::timestamp::date + interval'2 day')::date, (now()::timestamp::date + interval'2 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'2 day' + interval'4 hours')::timestamp, 8),
(3, (now()::timestamp::date + interval'3 day')::date, (now()::timestamp::date + interval'3 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'3 day' + interval'4 hours')::timestamp, 8),
(4, (now()::timestamp::date + interval'4 day')::date, (now()::timestamp::date + interval'4 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'4 day' + interval'4 hours')::timestamp, 8),
(5, (now()::timestamp::date + interval'5 day')::date, (now()::timestamp::date + interval'5 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'5 day' + interval'4 hours')::timestamp, 8),
(6, (now()::timestamp::date + interval'6 day')::date, (now()::timestamp::date + interval'6 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'6 day' + interval'4 hours')::timestamp, 8),
(7, (now()::timestamp::date + interval'7 day')::date, (now()::timestamp::date + interval'7 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'7 day' + interval'4 hours')::timestamp, 8),
(8, (now()::timestamp::date + interval'8 day')::date, (now()::timestamp::date + interval'8 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'8 day' + interval'4 hours')::timestamp, 8),
(9, (now()::timestamp::date + interval'9 day')::date, (now()::timestamp::date + interval'9 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'9 day' + interval'4 hours')::timestamp, 8),
(10, (now()::timestamp::date + interval'10 day')::date, (now()::timestamp::date + interval'10 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'10 day' + interval'4 hours')::timestamp, 8),
(11, (now()::timestamp::date + interval'11 day')::date, (now()::timestamp::date + interval'11 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'11 day' + interval'4 hours')::timestamp, 8),
(12, (now()::timestamp::date + interval'12 day')::date, (now()::timestamp::date + interval'12 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'12 day' + interval'4 hours')::timestamp, 8),
(13, (now()::timestamp::date + interval'13 day')::date, (now()::timestamp::date + interval'13 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'13 day' + interval'4 hours')::timestamp, 8),
(14, (now()::timestamp::date + interval'14 day')::date, (now()::timestamp::date + interval'14 day' - interval'3 hours')::timestamp, (now()::timestamp::date + interval'14 day' + interval'4 hours')::timestamp, 8);
