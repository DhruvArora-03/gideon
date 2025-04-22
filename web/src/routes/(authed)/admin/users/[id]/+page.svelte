<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import type { PageData } from './$types';

  type Props = {
    data: PageData;
  };
  const props: Props = $props();
</script>

<PageWrapper class="space-y-4 p-4" previousHref="/admin/users" previousPageTitle="All Users">
  <h1 class="text-2xl font-semibold">Manage User</h1>
  {#await props.data.user}
    Loading...
  {:then user}
    <p class="text-muted-foreground text-sm">
      Currently accessing user info for
      {user.first_name}
      {user.last_name}
    </p>
  {/await}
</PageWrapper>
