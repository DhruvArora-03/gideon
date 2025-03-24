<script lang="ts">
  import LogoutButton from '$lib/components/LogoutButton.svelte';
  import { Button } from '$lib/components/ui/button';
  import { resetMode } from 'mode-watcher';
  import type { PageProps } from './$types';
  import CardHeader from '$lib/components/ui/card/card-header.svelte';
  import { Card, CardContent, CardTitle } from '$lib/components/ui/card';
  import { setMode } from 'mode-watcher';
  import { Moon, Settings2, Sun } from 'lucide-svelte';
  import CardDescription from '$lib/components/ui/card/card-description.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
  import ChangePassword from '$lib/components/ChangePassword.svelte';

  let { data }: PageProps = $props();
</script>

{#snippet accountField(label: string, value: string)}
  <Label>
    <span class="text-bold">{label}</span>
    <Input class="mt-2" {value} readonly autocomplete="off" />
  </Label>
{/snippet}

<PageWrapper class="mx-auto max-w-md space-y-4 p-4">
  <h1 class="text-2xl font-semibold">Settings</h1>

  <LogoutButton supabase={data.supabase} />

  <Card>
    <CardHeader>
      <CardTitle>Account Details</CardTitle>
      <CardDescription>
        These account details are only editable by members of the admin team.
      </CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      {@render accountField('First Name', data.profile.first_name)}
      {@render accountField('Last Name', data.profile.last_name)}
      {@render accountField('Email', data.profile.email)}
      {@render accountField('Phone Number', data.profile.phone_number)}
    </CardContent>
  </Card>

  <ChangePassword form={data.form} />

  <Card>
    <CardHeader>
      <CardTitle>Theme</CardTitle>
      <CardDescription>
        Choose your color theme. You can specify your preference between light and dark mode here,
        or you can use your device's default setting.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button variant="secondary" class="mt-4" on:click={() => setMode('light')}>
        <Sun class="mr-2 size-4" /> Light
      </Button>
      <Button variant="secondary" class="mt-4" on:click={() => setMode('dark')}>
        <Moon class="mr-2 size-4" /> Dark
      </Button>
      <Button variant="secondary" class="mt-4" on:click={() => resetMode()}>
        <Settings2 class="mr-2 size-4" /> System
      </Button>
    </CardContent>
  </Card>
</PageWrapper>
