<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';

  let { children, data } = $props();
</script>

{#await data.profile}
  <Navigation showAdmin={false} />
{:then profile}
  <Navigation showAdmin={profile.role === 'manager' || profile.role === 'admin'} />
{/await}
{@render children()}
