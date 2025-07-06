<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import { formatDateWithWeekday, formatTime } from '$lib/date';
  import type { AssignmentStatus, SlotWithAssignments } from '$lib/server/db/schema';
  import { cn } from '$lib/utils';
  import {
    CalendarCheck,
    CalendarClock,
    CalendarPlus,
    LoaderCircle,
    LogOut,
    UserPlus,
  } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

  type Props = {
    data: SlotWithAssignments;
    userId: string;
  };
  let { data, userId }: Props = $props();

  const status: AssignmentStatus | null = $derived(
    data.assignments.find((a) => a.user_id === userId)?.assignment_status ?? null,
  );
  const slotsLeft = $derived(
    data.capacity - data.assignments.filter((a) => a.assignment_status === 'confirmed').length,
  );

  let loading = $state(false);

  // todo: change this to form
  async function signUp() {
    loading = true;

    try {
      const res = await fetch('/api/slots/signup', {
        method: 'POST',
        body: JSON.stringify({ slotId: data.id, userId }),
      });

      if (!res.ok) {
        throw new Error('Failed to sign up');
      }

      invalidateAll();
      toast.success('Signed up!', {
        description: `Confirmed shift on ${formatDateWithWeekday(data.start_time)} at ${formatTime(data.start_time)}`,
      });
    } catch (e) {
      console.warn(e);
      toast.error('Error!', {
        description: `Error signing up for shift on ${formatDateWithWeekday(data.start_time)} at ${formatTime(data.start_time)}`,
      });
    } finally {
      loading = false;
    }
  }

  // todo: change this to form
  async function waitlist() {
    loading = true;

    try {
      const res = await fetch('/api/slots/waitlist', {
        method: 'POST',
        body: JSON.stringify({ slotId: data.id, userId }),
      });

      if (!res.ok) {
        throw new Error('Failed to join waitlist');
      }

      invalidateAll();
      toast.success('Waitlisted!', {
        description: `Joined waitlist for shift on ${formatDateWithWeekday(data.start_time)} at ${formatTime(data.start_time)}`,
      });
    } catch (e) {
      console.warn(e);
      toast.error('Error!', {
        description: `Error joining waitlist for shift on ${formatDateWithWeekday(data.start_time)} at ${formatTime(data.start_time)}`,
      });
    } finally {
      loading = false;
    }
  }

  // todo: change this to form
  async function cancel() {
    loading = true;
    try {
      const res = await fetch('/api/slots/cancel', {
        method: 'POST',
        body: JSON.stringify({ slotId: data.id, userId }),
      });

      if (!res.ok) {
        throw new Error('Failed to cancel shift');
      }

      invalidateAll();
      toast.success('Cancelled!', {
        description: `Cancelled shift on ${formatDateWithWeekday(data.start_time)} at ${formatTime(data.start_time)}`,
      });
    } catch (e) {
      console.warn(e);
      toast.error('Error!', {
        description: `Error cancelling shift on ${formatDateWithWeekday(data.start_time)} at ${formatTime(data.start_time)}`,
      });
    } finally {
      loading = false;
    }
  }
</script>

<Card class="w-full max-w-sm space-y-2 p-3 [&>*]:p-0 ">
  <CardHeader>
    <CardTitle
      class={cn('flex w-full items-center gap-1 text-sm font-semibold [&>svg]:h-4 [&>svg]:w-4')}
    >
      {#if status === 'confirmed'}
        <CalendarCheck class="mr-2" size={16} /> Confirmed
      {:else if status === 'waitlisted'}
        <CalendarClock class="mr-2" size={16} /> Waitlisted
      {:else if slotsLeft === 0}
        <span class="text-destructive">Unavailable</span>
      {:else}
        <span class="text-green">Available!</span>
      {/if}
    </CardTitle>
    <CardDescription>
      <p class="md:flex md:flex-col">
        <span>Start: {formatTime(data.start_time)}</span>
        <span class="md:hidden">{' - '}</span>
        <span>End: {formatTime(data.end_time)}</span>
      </p>
      <p>
        {data.capacity - slotsLeft} / {data.capacity} taken
      </p>
    </CardDescription>
  </CardHeader>
  <CardContent>
    {#if status === 'confirmed' || status === 'waitlisted'}
      <Button class="w-full" variant="destructive" onclick={cancel} disabled={loading}>
        {#if loading}
          <LoaderCircle class="animate-spin" />
        {:else}
          <LogOut class="mr-2" size={16} /> Cancel
        {/if}
      </Button>
    {:else if slotsLeft === 0}
      <Button class="w-full" variant="secondary" onclick={waitlist} disabled={loading}>
        {#if loading}
          <LoaderCircle class="animate-spin" />
        {:else}
          <UserPlus class="mr-2" size={16} /> Join Waitlist
        {/if}
      </Button>
    {:else}
      <Button class="w-full" onclick={signUp} disabled={loading}>
        {#if loading}
          <LoaderCircle class="animate-spin" />
        {:else}
          <CalendarPlus class="mr-2" size={16} /> Sign up
        {/if}
      </Button>
    {/if}
  </CardContent>
</Card>
