<script lang="ts">
  import LogoutButton from '$lib/components/LogoutButton.svelte';
  import type { PageData } from './$types';

  let { supabase }: PageData = $props();
</script>

<h1>Settings</h1>
<LogoutButton {supabase} />
