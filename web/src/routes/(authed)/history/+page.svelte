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
    SelectItem,
    SelectLabel,
    SelectTrigger,
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
      type="single"
      bind:value={
        () => '' + data.month,
        (v) => {
          page.url.searchParams.set('month', v);
          goto(`?${page.url.searchParams.toString()}`, {
            invalidateAll: true,
          });
        }
      }
      {disabled}
    >
      <SelectTrigger class="w-40">{MONTHS[data.month]}</SelectTrigger>
      <SelectContent class="w-40">
        <SelectGroup>
          <SelectLabel>Month</SelectLabel>
          {#each MONTHS as month, i (month)}
            <SelectItem value={'' + i}>{month}</SelectItem>
          {/each}
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select
      type="single"
      bind:value={
        () => '' + data.year,
        (v) => {
          page.url.searchParams.set('year', v);
          goto(`?${page.url.searchParams.toString()}`, {
            invalidateAll: true,
          });
        }
      }
      {disabled}
    >
      <SelectTrigger class="w-40">
        {data.year}
      </SelectTrigger>
      <SelectContent class="w-40">
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          {#each YEARS as year (year)}
            <SelectItem value={'' + year}>{year}</SelectItem>
          {/each}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
{/snippet}

<PageWrapper class="pt-4">
  <div class="pb-6">
    <h1 class="text-2xl font-semibold tracking-tight">Previous Shifts</h1>
    <h2 class="text-muted-foreground">Review all of your recorded shifts.</h2>
  </div>

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
</PageWrapper>
