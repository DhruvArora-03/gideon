alter sequence "public"."sessions_id_seq" start with 1000;
alter sequence "public"."sessions_id_seq" restart;

INSERT INTO "public"."sessions" ("id", "user_id", "clock_in", "clock_out", "was_scheduled")
VALUES
(01, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'01 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'02 day' + interval'1.5 hours')::timestamp, true),
(02, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'02 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'03 day' + interval'1.5 hours')::timestamp, true),
(03, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'03 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'04 day' + interval'1.5 hours')::timestamp, true),
(04, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'04 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'05 day' + interval'1.5 hours')::timestamp, true),
(05, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'05 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'06 day' + interval'1.5 hours')::timestamp, true),
(06, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'06 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'07 day' + interval'1.5 hours')::timestamp, true),
(07, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'07 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'08 day' + interval'1.5 hours')::timestamp, true),
(08, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'08 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'09 day' + interval'1.5 hours')::timestamp, true),
(09, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'09 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'10 day' + interval'1.5 hours')::timestamp, true),
(10, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'10 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'11 day' + interval'1.5 hours')::timestamp, true),
(11, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'11 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'12 day' + interval'1.5 hours')::timestamp, true),
(12, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'12 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'13 day' + interval'1.5 hours')::timestamp, true),
(13, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'13 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'14 day' + interval'1.5 hours')::timestamp, true),
(14, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'14 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'15 day' + interval'1.5 hours')::timestamp, true),
(15, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'15 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'16 day' + interval'1.5 hours')::timestamp, true),
(16, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'16 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'17 day' + interval'1.5 hours')::timestamp, true),
(17, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'17 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'18 day' + interval'1.5 hours')::timestamp, true),
(18, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'18 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'19 day' + interval'1.5 hours')::timestamp, true),
(19, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'19 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'20 day' + interval'1.5 hours')::timestamp, true),
(20, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'20 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'21 day' + interval'1.5 hours')::timestamp, true),
(21, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'21 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'22 day' + interval'1.5 hours')::timestamp, true),
(22, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'22 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'23 day' + interval'1.5 hours')::timestamp, true),
(23, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'23 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'24 day' + interval'1.5 hours')::timestamp, true),
(24, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'24 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'25 day' + interval'1.5 hours')::timestamp, true),
(25, '00000000-0000-0000-0000-000000000001', (now()::timestamp::date + interval'25 day' + interval'21 hours')::timestamp, (now()::timestamp::date + interval'26 day' + interval'1.5 hours')::timestamp, true);
