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
  import UpcomingAssignmentsTable from '$lib/components/UpcomingAssignmentsTable.svelte';
  import { MONTHS, YEARS } from '$lib/date';
  import type { PageData } from './$types';
  import EditUserDialog from '$lib/components/EditUserDialog.svelte';
  import { Button } from '$lib/components/ui/button';
  import { MediaQuery } from 'svelte/reactivity';
  import RoleBadge from '$lib/components/RoleBadge.svelte';

  type Props = {
    data: PageData;
  };
  const { data }: Props = $props();

  const desktop = new MediaQuery('(min-width: 768px)');
</script>

{#snippet dateSelect(disabled: boolean)}
  <div class="mb-2 flex flex-row gap-2">
    <Select
      type="single"
      name="month"
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
      <SelectTrigger class="w-[150px]">{MONTHS[data.month]}</SelectTrigger>
      <SelectContent class="w-[150px]">
        <SelectGroup>
          <SelectLabel>Months</SelectLabel>
          {#each MONTHS as month, i (month)}
            <SelectItem value={'' + i} label={month} />
          {/each}
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select
      type="single"
      name="year"
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
      <SelectTrigger class="w-[150px]">{data.year}</SelectTrigger>
      <SelectContent class="w-[150px]">
        <SelectGroup>
          <SelectLabel>Years</SelectLabel>
          {#each YEARS as year (year)}
            <SelectItem value={'' + year} label={'' + year} />
          {/each}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
{/snippet}

<PageWrapper
  class="mx-auto max-w-screen-lg space-y-4 p-4"
  previousHref="/admin/users"
  previousPageTitle="All Users"
>
  {#await data.userInfo}
    <div class="flex flex-row justify-between">
      <h1 class="text-2xl font-bold tracking-tight">Loading...</h1>
      <Button disabled>Loading...</Button>
    </div>
  {:then userInfo}
    <div class="flex flex-col justify-between gap-2 md:flex-row">
      <div>
        <h1
          class="flex flex-row items-center gap-2 text-2xl font-semibold tracking-tight md:self-center"
        >
          {userInfo.first_name}
          {userInfo.last_name}
          <RoleBadge {userInfo} />
        </h1>
        <p class="text-muted-foreground text-sm">
          {userInfo.email}
          <br />
          {userInfo.phone_number}
        </p>
      </div>
      <EditUserDialog class="w-full md:ml-auto md:w-fit" {userInfo} form={data.form} />
    </div>
  {/await}

  <div class="flex flex-row flex-wrap items-start gap-4">
    <Card class="max-w-md">
      <CardHeader>
        <CardTitle>Upcoming Shifts</CardTitle>
        <CardDescription>
          Review all upcoming shift assignments; clicking on a shift will allow you to manually
          remove a user's assignment.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {#await data.assignments}
          Loading...
        {:then assignments}
          <UpcomingAssignmentsTable
            {assignments}
            caption={`${assignments.length === 0 ? 'No' : assignments.length} upcoming shifts found`}
          />
        {:catch error}
          Could not load upcoming shifts: {error.message}
        {/await}
      </CardContent>
    </Card>

    <Card class="max-w-md">
      <CardHeader>
        <CardTitle>Previous Shifts</CardTitle>
        <CardDescription>
          Review all previously recorded shifts; clicking on a shift will allow you to manually make
          changes and leave comments.
        </CardDescription>
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
  </div>
</PageWrapper>
