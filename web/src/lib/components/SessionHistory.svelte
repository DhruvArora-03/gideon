<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import CardDescription from '$lib/components/ui/card/card-description.svelte';
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

<Card>
  <CardHeader>
    <CardTitle>Previous Shifts</CardTitle>
    <CardDescription>Your previous shifts.</CardDescription>
  </CardHeader>
  <CardContent>
    <Table>
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
            <TableCell>{formatDateWithWeekday(s.clock_in)}</TableCell>
            <TableCell>{formatTime(s.clock_in)}</TableCell>
            <TableCell>{s.clock_out ? formatTime(s.clock_out) : ''}</TableCell>
            <TableCell>{s.clock_out ? getDuration(s.clock_in, s.clock_out) : ''}</TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </CardContent>
</Card>
