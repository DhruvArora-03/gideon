<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import ShiftSignup from '$lib/components/ShiftSignup.svelte';

  let { data } = $props();
</script>

<PageWrapper>
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
