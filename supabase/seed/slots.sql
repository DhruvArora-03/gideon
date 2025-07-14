alter sequence "public"."slots_id_seq" start with 1000;
alter sequence "public"."slots_id_seq" restart;

insert into "public"."slots" ("id", "date", "start_time", "end_time", "capacity")
select
    gs.id,
    (now() + (gs.id * interval'1 day'))::date,
    '15:30'::time,
    '19:00'::time,
    8
from
    generate_series(1, 14) as gs(id);
