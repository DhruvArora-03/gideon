<script lang="ts">
  import LogoutButton from '$lib/components/LogoutButton.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<h1>Settings</h1>
<LogoutButton supabase={data.supabase} />
