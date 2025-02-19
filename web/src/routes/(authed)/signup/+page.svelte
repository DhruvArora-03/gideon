<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import ShiftSignup from '$lib/components/ShiftSignup.svelte';

  let { data } = $props();
</script>

<PageWrapper>
  <div class="flex h-full items-center justify-center">
    <ShiftSignup slots={data.slots} userId={data.user.id} />
  </div>
</PageWrapper>
