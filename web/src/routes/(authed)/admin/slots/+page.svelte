<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import { Table, TableBody, TableCell, TableHead, TableRow } from '$lib/components/ui/table';
  import TableHeader from '$lib/components/ui/table/table-header.svelte';
  import { formatDateWithWeekday, formatTime } from '$lib/date';
  import type { PageData } from './$types';

  type Props = {
    data: PageData;
  };
  const { data }: Props = $props();
</script>

<PageWrapper class="mx-auto max-w-md">
  <Card class="m-4">
    <CardHeader>
      <CardTitle class="text-2xl">Manage Slots</CardTitle>
      <CardDescription>
        Data of all upcoming slots. Counts is (SF/WL/ES).
        <br />
        - SF: Spots Filled
        <br />
        - WL: Waitlisted
        <br />
        - ES: Empty Slots
      </CardDescription>
    </CardHeader>
    <CardContent>
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
              {@const signups = s.assignments.filter(
                (a) => a.assignment_status === 'confirmed',
              ).length}
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
    </CardContent>
  </Card>
</PageWrapper>
