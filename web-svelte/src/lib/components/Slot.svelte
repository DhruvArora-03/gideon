<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import { formatTime } from '$lib/date';
  import type { AssignmentStatus, SlotWithAssignments } from '$lib/server/db/schema';
  import { cn } from '$lib/utils';
  import { AlarmClockPlus, CalendarCheck, Clock, LogOut, UserPlus, XCircle } from 'lucide-svelte';

  type Props = {
    data: SlotWithAssignments;
    userId: string;
  };
  let { data, userId }: Props = $props();

  const status: AssignmentStatus =
    data.assignments.find((a) => a.user_id === userId)?.assignment_status ?? 'cancelled';
  const slotsLeft =
    data.capacity - data.assignments.filter((a) => a.assignment_status === 'confirmed').length;

  function signUp() {
    //     fetch('/');
    alert('signed up!');
    invalidate('getSlots');
  }

  function cancel() {
    //     fetch('/');
    invalidate('getSlots');
  }
</script>

<Card class="w-full max-w-sm space-y-2 p-3 [&>*]:p-0 ">
  <CardHeader>
    <CardTitle
      class={cn('flex w-full items-center gap-1 text-sm font-semibold [&>svg]:h-4 [&>svg]:w-4')}
    >
      {#if status === 'confirmed'}
        <CalendarCheck /> Confirmed
      {:else if status === 'waitlisted'}
        <Clock /> Waitlisted
      {:else if slotsLeft === 0}
        <AlarmClockPlus /> Join Waitlist
      {:else}
        <p class="text-green">Available!</p>
      {/if}
    </CardTitle>
    <CardDescription>
      <p class="md:flex md:flex-col lg:block">
        <span>{formatTime(data.start_time)}</span>
        <span class="md:hidden lg:inline">{' - '}</span>
        <span>{formatTime(data.end_time)}</span>
      </p>
      <p>
        {data.capacity - slotsLeft} / {data.capacity} taken
      </p>
    </CardDescription>
  </CardHeader>
  <CardContent>
    {#if status === 'confirmed' || status === 'waitlisted'}
      <Button class="w-full" variant="destructive" onclick={cancel}>
        <LogOut /> Cancel
      </Button>
    {:else}
      <Button class="w-full" onclick={signUp} disabled={slotsLeft === 0}>
        <UserPlus /> Sign Up
      </Button>
    {/if}
  </CardContent>
</Card>
