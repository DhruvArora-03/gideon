<script lang="ts">
  import { buttonVariants, type ButtonSize, type ButtonVariant } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '$lib/components/ui/dialog';
    import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  type Props = {
    class?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    label: string | Snippet;
    description?: string;
    children: Snippet;
  };
  const { class: className,variant, size, label, description, children }: Props = $props();
</script>

<Dialog>
  <DialogTrigger class={cn(buttonVariants({ variant, size }), className)} type="button">
    {#if typeof label === 'string'}
      {label}
    {:else}
      {@render label()}
    {/if}
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>

    <DialogFooter>
      {@render children()}
    </DialogFooter>
  </DialogContent>
</Dialog>
