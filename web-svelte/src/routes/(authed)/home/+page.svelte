<script lang="ts">
  import LogoutButton from '$lib/components/LogoutButton.svelte';

  let { data } = $props();
  const { supabase } = data;
</script>

<h1>Home!</h1>
<LogoutButton {supabase} />
