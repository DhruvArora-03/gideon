<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import type { Profile } from '$lib/server/db/schema';
  import { cn } from '$lib/utils';

  type Props = {
    class?: string;
    userInfo: Profile;
  };
  const { class: className, userInfo }: Props = $props();
</script>

<Badge
  variant={!userInfo.active ? 'destructive' : userInfo.role}
  class={cn('capitalize', className)}
>
  {#if userInfo.active}
    {userInfo.role}
  {:else}
    deactivated
  {/if}
</Badge>
