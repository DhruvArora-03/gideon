create or replace function public.handle_new_user()
 returns trigger
 language plpgsql
 security definer set search_path to ''
as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    phone_number,
    role
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'phone_number',
    (new.raw_user_meta_data ->> 'role')::public.user_role
  );
  return new;
end;
$$;
