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
  import { MessageSquare } from 'lucide-svelte';

  type Props = {
    data: {
      sessions: Session[];
    };
  };
  const { data }: Props = $props();
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
        {#each data.sessions as s (s.id)}
          <TableRow>
            <TableCell>{formatDateWithWeekday(s.clock_in)}</TableCell>
            <TableCell>{formatTime(s.clock_in)}</TableCell>
            <TableCell>{s.clock_out ? formatTime(s.clock_out) : ''}</TableCell>
            <TableCell>{s.clock_out ? getDuration(s.clock_in, s.clock_out) : ''}</TableCell>
          </TableRow>
          {#if s.employee_notes}
            <TableRow class="bg-secondary text-secondary-foreground">
              <TableCell colspan={4} class="py-4 pl-6">
                <MessageSquare class="mr-1 inline h-4 w-4" />
                You: "{s.employee_notes}"
              </TableCell>
            </TableRow>
          {/if}
          {#if s.admin_notes}
            <TableRow class="bg-secondary text-secondary-foreground">
              <TableCell colspan={4} class="py-4 pl-6">
                <MessageSquare class="mr-1 inline h-4 w-4" />
                Admin Team: "{s.admin_notes}"
              </TableCell>
            </TableRow>
          {/if}
        {/each}
      </TableBody>
    </Table>
  </CardContent>
</Card>
