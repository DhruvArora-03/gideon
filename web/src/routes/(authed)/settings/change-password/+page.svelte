<script lang="ts">
  import ChangePassword from '$lib/components/ChangePassword.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import type { PageData } from '../$types';

  type Props = {
    data: PageData;
  };
  let { data }: Props = $props();
</script>

<PageWrapper
  class="flex items-center justify-center"
  previousHref="/settings"
  previousPageTitle="Settings"
>
  <ChangePassword class="mx-auto max-w-md" form={data.form} />
</PageWrapper>
