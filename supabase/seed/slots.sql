alter sequence "public"."slots_id_seq" start with 1000;
alter sequence "public"."slots_id_seq" restart;

INSERT INTO "public"."slots" ("id", "start_time", "end_time", "capacity")
VALUES
(01, (now()::timestamp::date + interval'01 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'1 day' + interval'19 hours')::timestamp, 8),
(02, (now()::timestamp::date + interval'02 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'2 day' + interval'19 hours')::timestamp, 8),
(03, (now()::timestamp::date + interval'03 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'3 day' + interval'19 hours')::timestamp, 8),
(04, (now()::timestamp::date + interval'04 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'4 day' + interval'19 hours')::timestamp, 8),
(05, (now()::timestamp::date + interval'05 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'5 day' + interval'19 hours')::timestamp, 8),
(06, (now()::timestamp::date + interval'06 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'6 day' + interval'19 hours')::timestamp, 8),
(07, (now()::timestamp::date + interval'07 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'7 day' + interval'19 hours')::timestamp, 8),
(08, (now()::timestamp::date + interval'08 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'8 day' + interval'19 hours')::timestamp, 8),
(09, (now()::timestamp::date + interval'09 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'9 day' + interval'19 hours')::timestamp, 8),
(10, (now()::timestamp::date + interval'10 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'10 day' + interval'19 hours')::timestamp, 8),
(11, (now()::timestamp::date + interval'11 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'11 day' + interval'19 hours')::timestamp, 8),
(12, (now()::timestamp::date + interval'12 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'12 day' + interval'19 hours')::timestamp, 8),
(13, (now()::timestamp::date + interval'13 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'13 day' + interval'19 hours')::timestamp, 8),
(14, (now()::timestamp::date + interval'14 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'14 day' + interval'19 hours')::timestamp, 8),
(15, (now()::timestamp::date + interval'15 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'15 day' + interval'19 hours')::timestamp, 8),
(16, (now()::timestamp::date + interval'16 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'16 day' + interval'19 hours')::timestamp, 8),
(17, (now()::timestamp::date + interval'17 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'17 day' + interval'19 hours')::timestamp, 8),
(18, (now()::timestamp::date + interval'18 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'18 day' + interval'19 hours')::timestamp, 8),
(19, (now()::timestamp::date + interval'19 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'19 day' + interval'19 hours')::timestamp, 8),
(20, (now()::timestamp::date + interval'20 day' + interval'15 hours')::timestamp, (now()::timestamp::date + interval'20 day' + interval'19 hours')::timestamp, 8);
