-- 7 slots full, 4 slots with 2 open, 3 slots with 3 open

-- Fully booked slots (8 assignments each)
INSERT INTO public.assignments (user_id, slot_id, assignment_status, created_at, updated_at)
VALUES
    ('00000000-0000-0000-0000-000000000001', 1, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 1, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 1, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 1, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 1, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000006', 1, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000007', 1, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 1, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000001', 2, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 2, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 2, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 2, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 2, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000006', 2, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000007', 2, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 2, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000001', 3, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 3, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 3, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 3, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 3, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000006', 3, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000007', 3, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 3, 'confirmed', current_timestamp, current_timestamp);

-- Slots with 2 open spots (6 assignments each)
INSERT INTO public.assignments (user_id, slot_id, assignment_status, created_at, updated_at)
VALUES
    ('00000000-0000-0000-0000-000000000001', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000006', 4, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000007', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000009', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000010', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000001', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 5, 'confirmed', current_timestamp, current_timestamp);

-- Slots with 3 open spots (5 assignments each)
INSERT INTO public.assignments (user_id, slot_id, assignment_status, created_at, updated_at)
VALUES
    ('00000000-0000-0000-0000-000000000001', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 6, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000006', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000007', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000009', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000010', 7, 'confirmed', current_timestamp, current_timestamp);
