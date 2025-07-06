<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { Table, TableBody, TableCell, TableHead, TableRow } from '$lib/components/ui/table';
  import TableHeader from '$lib/components/ui/table/table-header.svelte';
  import { formatDateWithWeekday, formatTime } from '$lib/date';
  import type { PageData } from './$types';

  type Props = {
    data: PageData;
  };
  const { data }: Props = $props();
</script>

<PageWrapper class="mx-auto max-w-screen-lg py-4">
  <div class="space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Manage Slots</h1>
    <p class="text-muted-foreground text-sm">
      Data of all upcoming slots. Counts is (SF/WL/ES).
      <br />
      - SF: Spots Filled
      <br />
      - WL: Waitlisted
      <br />
      - ES: Empty Slots
    </p>
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
