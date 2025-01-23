<script lang="ts">
  import InviteUser from '$lib/components/InviteUser.svelte';

  const { data } = $props();
</script>

<h1>Manage Users</h1>
<InviteUser data={data.form} />
