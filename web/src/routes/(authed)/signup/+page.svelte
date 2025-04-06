<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import ShiftSignup from '$lib/components/ShiftSignup.svelte';
  import type { PageData } from './$types.js';

  type Props = {
    data: PageData;
  };
  let { data }: Props = $props();
</script>

<PageWrapper>
  <div class="flex h-full items-center justify-center">
    {#await data.slots}
      Loading...
    {:then slots}
      <ShiftSignup {slots} userId={data.user.id} />
    {:catch error}
      Could not load slots: {error.message}
    {/await}
  </div>
</PageWrapper>
