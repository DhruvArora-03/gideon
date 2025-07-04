alter sequence "public"."slots_id_seq" start with 1000;
alter sequence "public"."slots_id_seq" restart;

INSERT INTO "public"."slots" ("id", "start_time", "end_time", "capacity")
VALUES
(01, (now()::timestamp::date + interval'01 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'02 day' + interval'1.5 hours')::timestamp, 8),
(02, (now()::timestamp::date + interval'02 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'03 day' + interval'1.5 hours')::timestamp, 8),
(03, (now()::timestamp::date + interval'03 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'04 day' + interval'1.5 hours')::timestamp, 8),
(04, (now()::timestamp::date + interval'04 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'05 day' + interval'1.5 hours')::timestamp, 8),
(05, (now()::timestamp::date + interval'05 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'06 day' + interval'1.5 hours')::timestamp, 8),
(06, (now()::timestamp::date + interval'06 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'07 day' + interval'1.5 hours')::timestamp, 8),
(07, (now()::timestamp::date + interval'07 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'08 day' + interval'1.5 hours')::timestamp, 8),
(08, (now()::timestamp::date + interval'08 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'09 day' + interval'1.5 hours')::timestamp, 8),
(09, (now()::timestamp::date + interval'09 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'10 day' + interval'1.5 hours')::timestamp, 8),
(10, (now()::timestamp::date + interval'10 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'11 day' + interval'1.5 hours')::timestamp, 8),
(11, (now()::timestamp::date + interval'11 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'12 day' + interval'1.5 hours')::timestamp, 8),
(12, (now()::timestamp::date + interval'12 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'13 day' + interval'1.5 hours')::timestamp, 8),
(13, (now()::timestamp::date + interval'13 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'14 day' + interval'1.5 hours')::timestamp, 8),
(14, (now()::timestamp::date + interval'14 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'15 day' + interval'1.5 hours')::timestamp, 8);
