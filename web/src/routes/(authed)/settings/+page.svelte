<script lang="ts">
  import LogoutButton from '$lib/components/LogoutButton.svelte';
  import { Button } from '$lib/components/ui/button';
  import { mode, resetMode } from 'mode-watcher';
  import type { PageProps } from './$types';
  import CardHeader from '$lib/components/ui/card/card-header.svelte';
  import { Card, CardContent, CardTitle } from '$lib/components/ui/card';
  import { setMode } from 'mode-watcher';
  import { Moon, Settings, Settings2, Sun } from 'lucide-svelte';
  import CardDescription from '$lib/components/ui/card/card-description.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';

  let { data }: PageProps = $props();
</script>

<PageWrapper class="space-y-4 p-4">
  <h1 class="text-2xl font-semibold">Settings</h1>

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
        <Sun /> Light
      </Button>
      <Button variant="secondary" class="mt-4" on:click={() => setMode('dark')}>
        <Moon /> Dark
      </Button>
      <Button variant="secondary" class="mt-4" on:click={() => resetMode()}>
        <Settings2 />System
      </Button>
    </CardContent>
  </Card>

  <LogoutButton supabase={data.supabase} />
</PageWrapper>
