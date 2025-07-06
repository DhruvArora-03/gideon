<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Table, TableBody, TableCell, TableHead, TableRow } from '$lib/components/ui/table';
  import TableHeader from '$lib/components/ui/table/table-header.svelte';
  import { formatDateWithWeekday, formatTime } from '$lib/date';
  import type { PageData } from './$types';
  import { ClockPlusIcon } from '@lucide/svelte';

  type Props = {
    data: PageData;
  };
  const { data }: Props = $props();

  let open = $state(false);
</script>

<PageWrapper class="mx-auto max-w-screen-lg py-4">
  <div class="flex flex-col justify-between gap-2 md:flex-row">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Manage Shifts</h1>
      <p class="text-muted-foreground text-sm">
        Data of all upcoming shifts. Counts is (SF/WL/ES).
        <br />
        - SF: Spots Filled
        <br />
        - WL: Waitlisted
        <br />
        - ES: Empty Slots
      </p>
    </div>
    <Button class="w-full md:ml-auto md:w-fit" onclick={() => (open = true)}>
      <ClockPlusIcon class="mr-2" size={16} />Invite New User
    </Button>
  </div>

  {#await data.slots}
    loading...
  {:then slots}
    <Table>
      <TableHeader>
        <TableHead>Date</TableHead>
        <TableHead>Start</TableHead>
        <TableHead>End</TableHead>
        <TableHead>Counts</TableHead>
      </TableHeader>
      <TableBody>
        {#each slots as s}
          {@const signups = s.assignments.filter((a) => a.assignment_status === 'confirmed').length}
          {@const waitlisted = s.assignments.filter(
            (a) => a.assignment_status === 'waitlisted',
          ).length}
          <TableRow>
            <TableCell>{formatDateWithWeekday(s.start_time)}</TableCell>
            <TableCell>{formatTime(s.start_time)}</TableCell>
            <TableCell>{formatTime(s.end_time)}</TableCell>
            <TableCell>{signups}/{waitlisted}/{s.capacity - signups - waitlisted}</TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  {:catch e}
    {e.message}
  {/await}
</PageWrapper>
