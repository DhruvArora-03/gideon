<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { LogOut } from 'lucide-svelte';

  type Props = {
    supabase: SupabaseClient;
    class?: string;
  };
  const props: Props = $props();

  function logout() {
    props.supabase.auth.signOut().then(() => goto('/login'));
  }
</script>

<Button class={cn('w-full', props.class)} onclick={logout}>
  <LogOut /> Log out
</Button>
