<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  type Props = HTMLAttributes<HTMLDivElement>;
  let { children, class: className, ...props }: Props = $props();
</script>

<div class={cn('flex items-center p-6 pt-0', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</div>
