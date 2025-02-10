<script lang="ts">
  import SessionHistory from '$lib/components/SessionHistory.svelte';
  import type { Session } from '$lib/server/db/schema';

  type Props = {
    sessions: Session[];
  };
  const { sessions }: Props = $props();
</script>

<SessionHistory {sessions} />
