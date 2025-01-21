<script lang="ts">
  import InviteUser from '$lib/components/InviteUser.svelte';

  const { data } = $props();
</script>

<h1>Auth Page</h1>
<InviteUser data={data.form} />
