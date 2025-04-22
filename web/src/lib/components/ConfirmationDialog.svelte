<script lang="ts">
  import { Button, type ButtonSize, type ButtonVariant } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '$lib/components/ui/dialog';
  import type { Snippet } from 'svelte';

  type Props = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    label: string | Snippet;
    description?: string;
    children: Snippet;
  };
  const { variant, size, label, description, children }: Props = $props();
</script>

<Dialog>
  <DialogTrigger>
    <Button {variant} {size}>
      {#if typeof label === 'string'}
        {label}
      {:else}
        {@render label()}
      {/if}
    </Button>
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
