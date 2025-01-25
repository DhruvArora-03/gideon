<script lang="ts">
  import Slot from '$lib/components/Slot.svelte';
  import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
  } from '$lib/components/ui/card';
  import { addDays, formatDate, formatDateWithWeekday, getDaysBetween } from '$lib/date';
  import type { Week } from '$lib/date';
  import type { SlotWithAssignments } from '$lib/server/db/schema';
  import { organizeSlots } from '$lib/slots';

  type Props = {
    slots: SlotWithAssignments[];
    userId: string;
  };
  let { userId, ...props }: Props = $props();
  let slots = $state(props.slots);

  let weeks: Week[] = $derived(organizeSlots(slots));
</script>

<div class="mx-auto flex max-w-screen-lg flex-col gap-8">
  {#each weeks as week}
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {formatDate(week.start)} - {formatDate(addDays(week.start, 6))}
          </CardTitle>
          <CardDescription class="sr-only">
            Available shifts for {formatDate(week.start)} - {formatDate(addDays(week.start, 6))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 gap-1 md:grid-cols-7">
            {#each week.days as day, index}
              <div class="flex flex-col gap-2">
                <h4 class="font-semibold">
                  {formatDateWithWeekday(addDays(week.start, index))}
                </h4>
                {#if getDaysBetween(week.start, new Date()) === index}
                  <div
                    class="text-green-foreground bg-green flex flex-1 items-center justify-center rounded-lg p-4 text-center"
                  >
                    Today
                  </div>
                {:else if day.length > 0}
                  {#each day as slot}
                    <Slot data={slot} {userId} />
                    {#if slot.id !== 17}
                      <Slot data={slot} {userId} />
                    {/if}
                  {/each}
                {:else}
                  <div
                    class="bg-muted text-muted-foreground flex min-h-20 flex-1 items-center justify-center rounded-lg p-4 text-center"
                  >
                    No slots available
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </CardContent>
      </Card>
    </div>
  {/each}
</div>
