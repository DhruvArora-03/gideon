<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import SessionTable from '$lib/components/SessionTable.svelte';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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
  import { MONTHS, YEARS } from '$lib/date';
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
        page.url.searchParams.set('month', String(res.value));
        goto(`?${page.url.searchParams.toString()}`, {
          invalidateAll: true,
        });
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
        $page.url.searchParams.set('year', String(res.value));
        goto(`?${$page.url.searchParams.toString()}`, {
          invalidateAll: true,
        });
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
        <SessionTable
          {sessions}
          caption={`${sessions.length === 0 ? 'No' : sessions.length} previous shifts found in ${MONTHS[data.month]} ${data.year}`}
        />
      {:catch error}
        Could not load history: {error.message}
      {/await}
    </CardContent>
  </Card>
</PageWrapper>
