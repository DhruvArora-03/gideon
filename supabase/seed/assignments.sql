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
    ('00000000-0000-0000-0000-000000000008', 3, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000001', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000006', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000007', 4, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 4, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000001', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000006', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000007', 5, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 5, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000001', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000006', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000007', 6, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 6, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000001', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000006', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000007', 7, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 7, 'confirmed', current_timestamp, current_timestamp);

-- Slots with 2 open spots (6 assignments each)
INSERT INTO public.assignments (user_id, slot_id, assignment_status, created_at, updated_at)
VALUES
    ('00000000-0000-0000-0000-000000000001', 8, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 8, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 8, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 8, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 8, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000006', 8, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000007', 9, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 9, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000009', 9, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000010', 9, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000001', 9, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 9, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000003', 10, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 10, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 10, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000006', 10, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000007', 10, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 10, 'confirmed', current_timestamp, current_timestamp);

-- Slots with 3 open spots (5 assignments each)
INSERT INTO public.assignments (user_id, slot_id, assignment_status, created_at, updated_at)
VALUES
    ('00000000-0000-0000-0000-000000000001', 11, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 11, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 11, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 11, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 11, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000006', 12, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000007', 12, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000008', 12, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000009', 12, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000010', 12, 'confirmed', current_timestamp, current_timestamp),

    ('00000000-0000-0000-0000-000000000001', 13, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000002', 13, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000003', 13, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000004', 13, 'confirmed', current_timestamp, current_timestamp),
    ('00000000-0000-0000-0000-000000000005', 13, 'confirmed', current_timestamp, current_timestamp);
