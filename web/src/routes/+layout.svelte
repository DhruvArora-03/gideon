<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { Toaster } from '$lib/components/ui/sonner';
  import { ModeWatcher } from 'mode-watcher';
  import { onMount } from 'svelte';
  import '../app.css';

  let { data, children } = $props();
  let { session, supabase } = $derived(data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        console.log('session changed - invalidating');
        invalidate('supabase:auth');
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<div class="mx-auto h-full min-h-screen w-full p-4 pb-16 md:pb-0">
  <ModeWatcher />
  <Toaster richColors />
  <title>Gideon Admin</title>
  {@render children()}
</div>
