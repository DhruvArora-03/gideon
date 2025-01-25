<script lang="ts">
  import LogoutButton from '$lib/components/LogoutButton.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import ShiftSignup from '$lib/components/ShiftSignup.svelte';

  let { data } = $props();
</script>

<PageWrapper>
  <!-- <h1>Home!</h1> -->
  <LogoutButton supabase={data.supabase} />
  {#await data.slots}
    <p>Loading...</p>
  {:then slots}
    <div class="flex h-full items-center justify-center">
      <ShiftSignup {slots} userId={data.user.id} />
    </div>
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</PageWrapper>
