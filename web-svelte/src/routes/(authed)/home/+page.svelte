<script lang="ts">
  import LogoutButton from '$lib/components/LogoutButton.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import SlotsDisplay from '$lib/components/SlotsDisplay.svelte';

  let { data } = $props();
</script>

<PageWrapper>
  <h1>Home!</h1>
  <LogoutButton supabase={data.supabase} />
  {#await data.slots}
    <p>Loading...</p>
  {:then slots}
    <SlotsDisplay {slots} userId={data.user.id} />
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</PageWrapper>
