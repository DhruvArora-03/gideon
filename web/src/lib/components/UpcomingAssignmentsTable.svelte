<script lang="ts">
  import type { SlotWithAssignments } from '$lib/server/db/schema';
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
    userId: string;
    assignments: SlotWithAssignments[];
    caption?: string;
  };
  const { userId, assignments, caption }: Props = $props();
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
        <TableCell>{formatDateWithWeekday(a.start_time)}</TableCell>
        <TableCell>{formatTime(a.start_time)}</TableCell>
        <TableCell>{formatTime(a.end_time)}</TableCell>
        <TableCell>{a.assignments.find((a) => a.user_id === userId)?.assignment_status}</TableCell>
      </TableRow>
    {/each}
  </TableBody>

  {#if caption}
    <TableCaption>
      {caption}
    </TableCaption>
  {/if}
</Table>
