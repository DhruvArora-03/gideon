<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '$lib/components/ui/table';
  import { formatDateWithWeekday, formatTime, getDuration } from '$lib/date';
  import type { Session } from '$lib/server/db/schema';

  type Props = {
    sessions: Session[];
  };
  const { sessions }: Props = $props();
</script>

<h1>Previous Shifts</h1>

<Table>
  <TableCaption>Your previous shifts.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>Clock In</TableHead>
      <TableHead>Clock Out</TableHead>
      <TableHead>Duration</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each sessions as s (s.id)}
      <TableRow>
        {`${s.id} - ${formatTime(s.clock_in)} - ${s.clock_out ? formatTime(s.clock_out) : null} - ${s.user_id}`}
        <TableCell>{formatDateWithWeekday(s.clock_in)}</TableCell>
        <TableCell>{formatTime(s.clock_in)}</TableCell>
        <TableCell>{s.clock_out ? formatTime(s.clock_out) : ''}</TableCell>
        <TableCell>{s.clock_out ? getDuration(s.clock_in, s.clock_out) : ''}</TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
