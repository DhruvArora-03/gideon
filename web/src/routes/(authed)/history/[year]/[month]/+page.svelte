<script lang="ts">
  import { goto } from '$app/navigation';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
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
  import { MessageSquare } from 'lucide-svelte';
  import type { PageData } from './$types';

  type Props = {
    data: PageData;
  };
  const { data }: Props = $props();
</script>

{#snippet dateSelect(disabled: boolean)}
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
      {disabled}
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
      {disabled}
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
{/snippet}

<PageWrapper class="pb-10 md:p-4">
  <Card>
    <CardHeader>
      <CardTitle>Previous Shifts</CardTitle>
      <CardDescription>Review all of your recorded shifts.</CardDescription>
    </CardHeader>

    <CardContent>
      {#await data.sessions}
        {@render dateSelect(true)}
        Loading...
      {:then sessions}
        {@render dateSelect(false)}
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
            {#each sessions as s (s.id)}
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
            {`${sessions.length === 0 ? 'No' : sessions.length} previous shifts found in ${MONTHS[data.month]} ${data.year}`}
          </TableCaption>
        </Table>
      {:catch error}
        Could not load history: {error.message}
      {/await}
    </CardContent>
  </Card>
</PageWrapper>
