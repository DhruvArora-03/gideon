<script lang="ts">
  const { data } = $props();
  const { slots } = $derived(data);
</script>

<h1>Hello World</h1>
{#each slots as slot (slot.id)}
  <div>{slot.date}</div>
{/each}
