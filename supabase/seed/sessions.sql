alter sequence "public"."sessions_id_seq" start with 1000;
alter sequence "public"."sessions_id_seq" restart;

INSERT INTO "public"."sessions" ("user_id", "clock_in", "clock_out", "was_scheduled")
VALUES
('00000000-0000-0000-0000-000000000001', (now()::date + interval'01 day' + interval'21 hours')::timestamp, (now()::date + interval'02 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'02 day' + interval'21 hours')::timestamp, (now()::date + interval'03 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'03 day' + interval'21 hours')::timestamp, (now()::date + interval'04 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'04 day' + interval'21 hours')::timestamp, (now()::date + interval'05 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'05 day' + interval'21 hours')::timestamp, (now()::date + interval'06 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'06 day' + interval'21 hours')::timestamp, (now()::date + interval'07 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'07 day' + interval'21 hours')::timestamp, (now()::date + interval'08 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'08 day' + interval'21 hours')::timestamp, (now()::date + interval'09 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'09 day' + interval'21 hours')::timestamp, (now()::date + interval'10 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'10 day' + interval'21 hours')::timestamp, (now()::date + interval'11 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'11 day' + interval'21 hours')::timestamp, (now()::date + interval'12 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'12 day' + interval'21 hours')::timestamp, (now()::date + interval'13 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'13 day' + interval'21 hours')::timestamp, (now()::date + interval'14 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'14 day' + interval'21 hours')::timestamp, (now()::date + interval'15 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'15 day' + interval'21 hours')::timestamp, (now()::date + interval'16 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'16 day' + interval'21 hours')::timestamp, (now()::date + interval'17 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'17 day' + interval'21 hours')::timestamp, (now()::date + interval'18 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'18 day' + interval'21 hours')::timestamp, (now()::date + interval'19 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'19 day' + interval'21 hours')::timestamp, (now()::date + interval'20 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'20 day' + interval'21 hours')::timestamp, (now()::date + interval'21 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'21 day' + interval'21 hours')::timestamp, (now()::date + interval'22 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'22 day' + interval'21 hours')::timestamp, (now()::date + interval'23 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'23 day' + interval'21 hours')::timestamp, (now()::date + interval'24 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'24 day' + interval'21 hours')::timestamp, (now()::date + interval'25 day' + interval'1.5 hours')::timestamp, true),
('00000000-0000-0000-0000-000000000001', (now()::date + interval'25 day' + interval'21 hours')::timestamp, (now()::date + interval'26 day' + interval'1.5 hours')::timestamp, true);
