<script lang="ts">
  import SessionHistory from '$lib/components/SessionHistory.svelte';
  import type { Session } from '$lib/server/db/schema';

  type Props = {
    data: {
      sessions: Session[];
    };
  };
  const { data }: Props = $props();

  const sessions = data.sessions;
  console.log(sessions);
</script>

<SessionHistory {sessions} />
