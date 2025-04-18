<script lang="ts">
  import Slot from '$lib/components/Slot.svelte';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from '$lib/components/ui/carousel';
  import { addDays, formatDate, formatDateWithWeekday, getDaysBetween } from '$lib/date';
  import type { SlotWithAssignments } from '$lib/server/db/schema';
  import { organizeSlots } from '$lib/slots';
  import { cn } from '$lib/utils';

  type Props = {
    slots: SlotWithAssignments[];
    userId: string;
  };
  let { userId, slots }: Props = $props();

  let weeks = $derived(organizeSlots(slots));
</script>

{#snippet mainContent(carouselOrientation: 'horizontal' | 'vertical')}
  <Carousel orientation={carouselOrientation} opts={{ align: 'start' }}>
    <Card class="w-full border-none shadow-none [&>*]:px-0 sm:[&>*]:px-6">
      <CardHeader>
        <CardTitle>Shift Signup</CardTitle>
        <CardDescription class="flex w-full gap-4">
          <p>
            Use the buttons on each shift to take action.
            <span class={cn({ hidden: carouselOrientation === 'vertical' })}>
              Click the arrows or drag horizontally to view more weeks.
            </span>
          </p>
          <div
            class={cn('shrink-3 ml-auto whitespace-nowrap', {
              hidden: carouselOrientation === 'vertical',
            })}
          >
            <CarouselPrevious disableDefaultPositioning />
            <CarouselNext disableDefaultPositioning />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CarouselContent>
          {#each weeks as week}
            <CarouselItem>
              <Card class="h-fit">
                <CardHeader>
                  <CardTitle>
                    {formatDate(week.start)} - {formatDate(addDays(week.start, 6))}
                  </CardTitle>
                  <CardDescription class="sr-only">
                    Available shifts for {formatDate(week.start)} - {formatDate(
                      addDays(week.start, 6),
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-1 gap-1 lg:grid-cols-7">
                    {#each week.days as day, index}
                      <div class="flex flex-col gap-2">
                        <h4 class={'mt-2 font-semibold lg:mt-0'}>
                          {#if getDaysBetween(week.start, new Date()) === index}
                            <span class="text-green">Today</span>
                          {:else}
                            {formatDateWithWeekday(addDays(week.start, index))}
                          {/if}
                        </h4>
                        {#if day.length > 0}
                          <div class="flex flex-row gap-2 lg:flex-col lg:gap-0">
                            {#each day as slot}
                              <Slot data={slot} {userId} />
                            {/each}
                          </div>
                        {:else}
                          <div class="text-muted-foreground rounded-lg p-4 text-center">
                            No shifts available
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          {/each}
        </CarouselContent>
      </CardContent>
    </Card>
  </Carousel>
{/snippet}

<div class="lg:hidden">
  {@render mainContent('horizontal')}
</div>

<div class="hidden lg:block">
  {@render mainContent('vertical')}
</div>
