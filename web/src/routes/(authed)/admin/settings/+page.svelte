<script lang="ts">
  import DefaultSlots from '$lib/components/DefaultSlots.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import type { PageData } from './$types';

  type Props = {
    data: PageData;
  };
  const props: Props = $props();
</script>

<PageWrapper class="mx-auto max-w-md space-y-4 p-4">
  <h1 class="text-2xl font-semibold">Admin Settings</h1>
  <DefaultSlots {...props.data} />
</PageWrapper>
