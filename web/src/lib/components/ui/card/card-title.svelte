<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { HeadingLevel } from './index';
  import { cn } from '$lib/utils';

  type Props = HTMLAttributes<HTMLHeadingElement> & {
    tag?: HeadingLevel;
  };
  let { children, class: className, tag = 'h3', ...props }: Props = $props();
</script>

<svelte:element
  this={tag}
  class={cn('text-lg font-semibold leading-none tracking-tight', className)}
  {...props}
>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>
