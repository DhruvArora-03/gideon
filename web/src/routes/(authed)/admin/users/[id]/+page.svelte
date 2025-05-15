<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import SessionTable from '$lib/components/SessionTable.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import { Control, Description, Field, FieldErrors, Label } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
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
  import UpcomingAssignmentsTable from '$lib/components/UpcomingAssignmentsTable.svelte';
  import { MONTHS, YEARS } from '$lib/date';
  import { updateAccountDetailsSchema, type UpdateAccountDetailsSchema } from '$lib/validation';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';
  import { USER_ROLES } from '$lib/models';

  type Props = {
    data: PageData;
  };
  const { data }: Props = $props();

  const form = superForm(data.form, {
    validators: zodClient(updateAccountDetailsSchema),
    resetForm: false,
    onResult: (e) => {
      if (e.result.type === 'success') {
        invalidateAll();
      }
    },
  });

  const { form: formData, message, enhance, submitting } = form;

  data.userInfo.then(formData.set);
</script>

{#snippet updateAccountDetails(userInfo?: UpdateAccountDetailsSchema)}
  <Card class="flex-1">
    <CardHeader>
      <CardTitle>Account Details</CardTitle>
      <CardDescription>You can update the current user's information here.</CardDescription>
    </CardHeader>

    <form class="flex flex-col gap-2" method="POST" action="?/updateAccountDetails" use:enhance>
      <CardContent>
        <div class="flex gap-4">
          <Field {form} name="first_name">
            <Control let:attrs>
              <Label>
                <div class="mb-2">First Name</div>
                {#if userInfo}
                  <Input
                    {...attrs}
                    type="text"
                    bind:value={$formData.first_name}
                    disabled={$submitting || !userInfo}
                  />
                {:else}
                  <Input {...attrs} value="Loading..." disabled />
                {/if}
              </Label>
            </Control>
            <Description class="sr-only">User's first name</Description>
            <FieldErrors />
          </Field>

          <Field {form} name="last_name">
            <Control let:attrs>
              <Label>
                <div class="mb-2">Last Name</div>
                {#if userInfo}
                  <Input
                    {...attrs}
                    type="text"
                    bind:value={$formData.last_name}
                    disabled={$submitting || !userInfo}
                  />
                {:else}
                  <Input {...attrs} value="Loading..." disabled />
                {/if}
              </Label>
            </Control>
            <Description class="sr-only">User's last name</Description>
            <FieldErrors />
          </Field>
        </div>

        <Field {form} name="email">
          <Control let:attrs>
            <Label>
              <div class="mb-2">Email</div>
              {#if userInfo}
                <Input
                  {...attrs}
                  type="text"
                  bind:value={$formData.email}
                  disabled={$submitting || !userInfo}
                />
              {:else}
                <Input {...attrs} value="Loading..." disabled />
              {/if}
            </Label>
          </Control>
          <Description class="sr-only">User's email address</Description>
          <FieldErrors />
        </Field>

        <Field {form} name="phone_number">
          <Control let:attrs>
            <Label>
              <div class="mb-2">Phone Number</div>
              {#if userInfo}
                <Input
                  {...attrs}
                  type="text"
                  bind:value={$formData.phone_number}
                  disabled={$submitting || !userInfo}
                />
              {:else}
                <Input {...attrs} value="Loading..." disabled />
              {/if}
            </Label>
          </Control>
          <Description class="sr-only">User's phone number</Description>
          <FieldErrors />
        </Field>

        <Field {form} name="role">
          <Control let:attrs>
            <Label>
              <div class="mb-2">Role</div>
              <Select
                selected={{
                  value: $formData.role,
                  label: userInfo ? $formData.role : 'Loading...',
                }}
                onSelectedChange={(res) => {
                  if (res) {
                    $formData.role = res?.value;
                  }
                }}
                disabled={$submitting || !userInfo}
              >
                <SelectTrigger class="max-w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    {#each USER_ROLES as role (role)}
                      <SelectItem value={role}>{role}</SelectItem>
                    {/each}
                  </SelectGroup>
                </SelectContent>

                <SelectInput {...attrs} bind:value={$formData.role} />
              </Select>
            </Label>
          </Control>
          <Description class="sr-only">User's role</Description>
          <FieldErrors />
        </Field>

        {#if $message}
          <p class="mt-4">
            {$message}
          </p>
        {/if}
      </CardContent>

      <CardFooter>
        <Button
          class="ml-auto"
          type="button"
          variant="secondary"
          disabled={!userInfo}
          onclick={() =>
            form.reset({
              data: userInfo,
            })}
        >
          Reset
        </Button>
        <Button class="ml-1" type="submit" disabled={$submitting || !userInfo}>Save Changes</Button>
      </CardFooter>
    </form>
  </Card>
{/snippet}

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
        page.url.searchParams.set('year', String(res.value));
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

{#snippet userHistory()}
  <Card class="flex-1">
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
{/snippet}

{#snippet upcomingShifts()}
  <Card class="flex-1">
    <CardHeader>
      <CardTitle>Upcoming Shifts</CardTitle>
      <CardDescription>
        Review all upcoming shift assignments; clicking on a shift will allow you to manually remove
        a user's assignment.
      </CardDescription>
    </CardHeader>

    <CardContent>
      {#await Promise.all([data.assignments, data.userInfo])}
        Loading...
      {:then [assignments, userInfo]}
        <UpcomingAssignmentsTable
          userId={userInfo.id}
          {assignments}
          caption={`${assignments.length === 0 ? 'No' : assignments.length} upcoming shifts found`}
        />
      {:catch error}
        Could not load upcoming shifts: {error.message}
      {/await}
    </CardContent>
  </Card>
{/snippet}

<PageWrapper class="space-y-4 p-4" previousHref="/admin/users" previousPageTitle="All Users">
  {#await data.userInfo}
    <h1 class="text-2xl font-semibold">Loading...</h1>

    <div class="flex flex-row items-start gap-4">
      {@render updateAccountDetails()}
      {@render userHistory()}
      {@render upcomingShifts()}
    </div>
  {:then userInfo}
    <h1 class="text-2xl font-semibold">
      {userInfo.first_name}
      {userInfo.last_name}
    </h1>

    <div class="flex flex-row items-start gap-4">
      {@render updateAccountDetails(userInfo)}
      {@render userHistory()}
      {@render upcomingShifts()}
    </div>
  {/await}
</PageWrapper>
