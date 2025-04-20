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

<PageWrapper class="space-y-4 p-4">
  <h1 class="text-2xl font-semibold">Manage Slots</h1>
  {#await data.slots}
    loading...
  {:then slots}
    <Table>
      <TableHeader>
        <TableHead>id</TableHead>
        <TableHead>date</TableHead>
        <TableHead>start</TableHead>
        <TableHead>end</TableHead>
        <TableHead># Signups</TableHead>
        <TableHead># Waitlist</TableHead>
        <TableHead>cap</TableHead>
      </TableHeader>
      <TableBody>
        {#each slots as s}
          <TableRow>
            <TableCell>
              {s.id}
            </TableCell>
            <TableCell>
              {formatDateWithWeekday(s.start_time)}
            </TableCell>
            <TableCell>
              {formatTime(s.start_time)}
            </TableCell>
            <TableCell>
              {formatTime(s.end_time)}
            </TableCell>
            <TableCell>
              {s.assignments.filter((a) => a.assignment_status === 'confirmed').length}
            </TableCell>
            <TableCell>
              {s.assignments.filter((a) => a.assignment_status === 'waitlisted').length}
            </TableCell>
            <TableCell>
              {s.capacity}
            </TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  {:catch e}
    {e.message}
  {/await}
</PageWrapper>
