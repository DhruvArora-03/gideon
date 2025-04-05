<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { Card } from '$lib/components/ui/card';
  import type { PageData } from './$types';

  type Props = {
    data: PageData;
  };
  const { data }: Props = $props();
</script>

<PageWrapper class="p-4">
  <h1 class="text-2xl font-semibold">
    Welcome Back, <span class="capitalize">{data.profile.first_name}</span>
  </h1>
  <Card>
    <pre>{JSON.stringify(data.profile, null, 2)}</pre>
  </Card>
</PageWrapper>
