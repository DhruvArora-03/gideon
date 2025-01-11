-- inserts a row into public.profiles
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
    phone_number
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'phone_number'
  );
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
