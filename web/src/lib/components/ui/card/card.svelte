<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  type Props = HTMLAttributes<HTMLDivElement>;
  let { children, class: className, ...props }: Props = $props();
</script>

<div class={cn('bg-card text-card-foreground rounded-lg border shadow-sm', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</div>
