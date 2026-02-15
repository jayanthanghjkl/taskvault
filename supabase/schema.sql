-- Create tasks table
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  is_completed boolean default false,
  user_id uuid references auth.users not null default auth.uid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table tasks enable row level security;

-- Policies
create policy "Users can select their own tasks"
  on tasks for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own tasks"
  on tasks for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own tasks"
  on tasks for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own tasks"
  on tasks for delete
  using ( auth.uid() = user_id );
