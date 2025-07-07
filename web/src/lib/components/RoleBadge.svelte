<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
    import type { UserRole } from '$lib/models';
  import { cn } from '$lib/utils';

  type Props = {
    class?: string;
    role: UserRole
    active?: boolean;
  };
  const { class: className, role,active }: Props = $props();
</script>

<Badge
  variant={active === false ? 'destructive' :role}
  class={cn('capitalize', className)}
>
  {#if active === false}
    deactivated
  {:else}
    {role}
  {/if}
</Badge>
