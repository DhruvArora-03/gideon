<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { LogOut } from 'lucide-svelte';

  type Props = {
    supabase: SupabaseClient;
  };
  let { supabase }: Props = $props();

  async function logout() {
    alert('logout');
    await supabase.auth.signOut();
    goto('/login');
  }
</script>

<Button class="w-full" onclick={logout}>
  <LogOut /> Log out
</Button>
