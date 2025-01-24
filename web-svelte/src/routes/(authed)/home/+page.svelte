<script lang="ts">
  import LogoutButton from '$lib/components/LogoutButton.svelte';
  import Slot from '$lib/components/Slot.svelte';

  let { data } = $props();
</script>

<h1>Home!</h1>
<LogoutButton supabase={data.supabase} />
{#await data.slots}
  <p>Loading...</p>
{:then slots}
  <h2>Slots - {slots.length}</h2>
  <div class="flex flex-col gap-4">
    {#each slots as slot (slot.id)}
      <Slot {slot} userId={data.user.id} />
    {/each}
  </div>
{:catch error}
  <p>Something went wrong: {error.message}</p>
{/await}
