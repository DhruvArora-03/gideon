<script lang="ts">
  import ChangePassword from '$lib/components/ChangePassword.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import type { ChangePasswordFormSchema } from '$lib/validation';
  import type { SuperValidated } from 'sveltekit-superforms';

  type Props = {
    data: {
      form: SuperValidated<ChangePasswordFormSchema>;
    };
  };
  let { data }: Props = $props();
</script>

<PageWrapper
  class="flex items-center justify-center"
  previousHref="/settings"
  previousPageTitle="Settings"
>
  <ChangePassword class="max-w-md" form={data.form} />
</PageWrapper>
