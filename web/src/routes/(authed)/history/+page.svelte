<script lang="ts">
  import { formatTime } from '$lib/date';
  import type { Session } from '$lib/server/db/schema';

  type Props = {
    sessions: Session[];
  };
  const { sessions }: Props = $props();
</script>

<h1>Previous Shifts</h1>
{#each sessions as s}
  <h3>
    {`${s.id} - ${formatTime(s.clock_in)} - ${s.clock_out ? formatTime(s.clock_out) : null} - ${s.user_id}`}
  </h3>
{/each}
