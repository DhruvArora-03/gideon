<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import { ArrowLeft } from 'lucide-svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
    class?: string;
    previousHref?: string;
    previousPageTitle?: string;
  };
  let { children, class: className, previousHref, previousPageTitle }: Props = $props();
</script>

<main class={cn('relative h-full min-h-screen', className)}>
  {#if previousHref}
    <Button class="h-fit p-0" variant="link" href={previousHref}>
      <ArrowLeft class="mr-2" size={16} />
      {previousPageTitle ? `Back to ${previousPageTitle}` : 'Back'}
    </Button>
  {/if}
  {@render children()}
</main>
