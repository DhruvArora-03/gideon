<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Eye, EyeOff } from '@lucide/svelte';
  import type { ComponentProps } from 'svelte';

  type Props = Omit<ComponentProps<typeof Input>, 'type'>;
  let { value = $bindable(), ...props }: Props = $props();

  let showPassword = $state(false);
</script>

<div class="relative">
  <Input type={showPassword ? 'text' : 'password'} bind:value {...props} />
  <Button
    class="absolute right-0 top-0"
    variant="ghost"
    tabindex={-1}
    onclick={() => {
      showPassword = !showPassword;
    }}
  >
    {#if showPassword}
      <Eye class="mr-2" size={16} />
    {:else}
      <EyeOff class="mr-2" size={16} />
    {/if}
    <span class="sr-only">
      {showPassword ? 'Hide Password' : 'Show Password'} password
    </span>
  </Button>
</div>
