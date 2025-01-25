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
  import { dateFormat, timeFormat } from '$lib/date';
  import type { Assignment, AssignmentStatus, SlotWithAssignments } from '$lib/server/db/schema';
  import { cn } from '$lib/utils';
  import { CalendarCheck, Clock, LogOut, UserPlus } from 'lucide-svelte';

  type Props = {
    slot: SlotWithAssignments;
    userId: string;
  };
  let { slot, userId }: Props = $props();

  const start = timeFormat.format(slot.start_time);
  const end = timeFormat.format(slot.end_time);
  const status: AssignmentStatus =
    slot.assignments
      .filter((a) => a.user_id === userId)
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())[0]?.assignment_status ??
    'cancelled';
  const date = new Date(slot.date);

  const userAssignments = new Map<string, Assignment>();
  let slotsLeft = slot.capacity;

  for (const a of slot.assignments) {
    const existing = userAssignments.get(a.user_id);

    if (existing && existing.created_at > a.created_at) {
      continue;
    }

    const wasConfirmed = existing?.assignment_status === 'confirmed';
    const isConfirmed = a.assignment_status === 'confirmed';

    userAssignments.set(a.user_id, a);

    if (isConfirmed && !wasConfirmed) {
      slotsLeft--;
    } else if (!isConfirmed && wasConfirmed) {
      slotsLeft++;
    }
  }

  function signUp() {
    //     fetch('/');
    invalidate('getSlots');
  }

  function cancel() {
    //     fetch('/');
    invalidate('getSlots');
  }
</script>

<Card class={'max-w-sm'}>
  <CardHeader>
    <CardTitle class="inline-flex items-center justify-between">
      {dateFormat.format(date)}
      <span
        class={cn(
          'inline-flex items-center gap-1 text-sm font-semibold [&>svg]:w-4',
          status === 'confirmed' && 'text-green',
        )}
      >
        {#if status === 'confirmed'}
          <CalendarCheck /> Confirmed
        {:else if status === 'waitlisted'}
          <Clock /> Waitlisted
        {:else}
          5 spots left!
        {/if}
      </span>
    </CardTitle>
    <CardDescription class="inline-flex items-start justify-between">
      {`${start} - ${end}`}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div class="flex gap-2">
      <Button
        class="w-full"
        variant="destructive"
        onclick={cancel}
        disabled={status === 'cancelled'}
      >
        <LogOut />Cancel
      </Button>
      <Button
        class="w-full"
        onclick={signUp}
        disabled={status === 'confirmed' || status === 'waitlisted'}
      >
        <UserPlus /> Sign Up
      </Button>
    </div>
  </CardContent>
</Card>
