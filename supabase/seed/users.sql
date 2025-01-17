-- create test users
insert into
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            lpad(row_number() over ()::text, 32, '0')::uuid,
            'authenticated',
            'authenticated',
            'user' || (row_number() over ()) || '@example.com',
            crypt ('Password123!', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            format('{"first_name":"%s","last_name":"%s","phone_number":"123-456-7890"}', 'First' || row_number() over (), 'Last' || row_number() over ())::jsonb,
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        from
            generate_series(1, 10)
    );

-- test user email identities
insert into
    auth.identities (
        id,
        user_id,
        provider_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            uuid_generate_v4 (),
            id,
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );
