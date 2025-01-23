<script lang="ts">
  let { data } = $props();
  const { slots } = data;
</script>

<h1>Hello World</h1>
{#each slots as slot (slot.id)}
  <div>{slot.date}</div>
{/each}
