<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
  } from '$lib/components/ui/card';
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectInput,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '$lib/components/ui/select';
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '$lib/components/ui/table';
  import { formatDateWithWeekday, formatTime, getDuration, MONTHS, YEARS } from '$lib/date';
  import type { Session } from '$lib/server/db/schema';
  import { redirect } from '@sveltejs/kit';
  import { MessageSquare } from 'lucide-svelte';

  type Props = {
    data: {
      sessions: Session[];
      month: number;
      year: number;
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
    <div class="mb-2 flex flex-row gap-2">
      <Select
        selected={{
          value: data.month,
          label: MONTHS[data.month],
        }}
        onSelectedChange={(res) => {
          if (!res) {
            return;
          }
          goto(`/history/${data.year}/${res.value}`);
        }}
      >
        <SelectTrigger class="max-w-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Month</SelectLabel>
            {#each MONTHS as month, i (month)}
              <SelectItem value={i}>{month}</SelectItem>
            {/each}
          </SelectGroup>
        </SelectContent>
        <SelectInput />
      </Select>
      <Select
        selected={{
          value: data.year,
          label: '' + data.year,
        }}
        onSelectedChange={(res) => {
          if (!res) {
            return;
          }
          goto(`/history/${res.value}/${data.month}`);
        }}
      >
        <SelectTrigger class="max-w-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Year</SelectLabel>
            {#each YEARS as year (year)}
              <SelectItem value={year}>{year}</SelectItem>
            {/each}
          </SelectGroup>
        </SelectContent>
        <SelectInput />
      </Select>
    </div>
    <Table>
      <TableHeader>
        <TableRow class="text-nowrap">
          <TableHead>Date</TableHead>
          <TableHead>Clock In</TableHead>
          <TableHead>Clock Out</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each data.sessions as s (s.id)}
          <TableRow class="text-nowrap">
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
      <TableCaption>
        {`${data.sessions.length} completed shifts found in ${MONTHS[data.month]} ${data.year}`}
      </TableCaption>
    </Table>
  </CardContent>
</Card>
