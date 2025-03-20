<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';

  let { children, data } = $props();
</script>

<Navigation showAdmin={data.profile.role === 'manager' || data.profile.role === 'admin'} />
{@render children()}
