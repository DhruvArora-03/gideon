<script lang="ts">
  import type { AssignmentWithSlot } from '$lib/server/db/schema';
  import { formatDate } from '$lib/date';
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '$lib/components/ui/table';
  import { formatDateWithWeekday, formatTime, getDuration, MONTHS } from '$lib/date';

  type Props = {
    assignments: AssignmentWithSlot[];
    caption?: string;
  };
  const { assignments, caption }: Props = $props();
</script>

<Table>
  <TableHeader>
    <TableRow class="text-nowrap">
      <TableHead>Date</TableHead>
      <TableHead>Start</TableHead>
      <TableHead>End</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {#each assignments as a (a.id)}
      <TableRow class="text-nowrap">
        <TableCell>{formatDateWithWeekday(a.slot.start_time)}</TableCell>
        <TableCell>{formatTime(a.slot.start_time)}</TableCell>
        <TableCell>{formatTime(a.slot.end_time)}</TableCell>
        <TableCell>{a.assignment_status}</TableCell>
      </TableRow>
    {/each}
  </TableBody>

  {#if caption}
    <TableCaption>
      {caption}
    </TableCaption>
  {/if}
</Table>
