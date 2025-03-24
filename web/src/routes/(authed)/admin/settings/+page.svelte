<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { buttonVariants } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '$lib/components/ui/dialog';
  import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,
    SheetDescription,
    SheetClose,
    SheetHeader,
    SheetFooter,
  } from '$lib/components/ui/sheet';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '$lib/components/ui/table';
  import { formatDotw, formatTime, parseTime } from '$lib/date';
  import type { DefaultSlot } from '$lib/server/db/schema';
  import { cn } from '$lib/utils';
  import { Edit } from 'lucide-svelte';
  import { MediaQuery } from 'svelte/reactivity';

  type Props = {
    data: {
      defaultSlots: DefaultSlot[];
    };
  };
  const { data }: Props = $props();

  const desktop = new MediaQuery('(min-width: 768px)');
</script>

{#snippet defaultSlotsTable()}
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Start</TableHead>
        <TableHead>End</TableHead>
        <TableHead colspan={2}>Capacity</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each data.defaultSlots as s, i (s.id)}
        {#if i === 0 || data.defaultSlots[i - 1].dotw !== s.dotw}
          <TableRow class="bg-secondary text-secondary-foreground">
            <TableCell colspan={4} class="font-semibold">{formatDotw(s.dotw)}</TableCell>
          </TableRow>
        {/if}
        <TableRow>
          <TableCell class="pl-4">{formatTime(parseTime(s.start_time))}</TableCell>
          <TableCell>{formatTime(parseTime(s.end_time))}</TableCell>
          <TableCell>{s.capacity}</TableCell>
          <TableCell align="right">
            {#if desktop.current}
              <DialogTrigger class={cn(buttonVariants({ variant: 'ghost' }))}>
                <Edit size={16} />
              </DialogTrigger>
            {:else}
              <SheetTrigger class={buttonVariants({ variant: 'ghost' })}>
                <Edit size={16} />
              </SheetTrigger>
            {/if}
          </TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
{/snippet}

<PageWrapper class="mx-auto max-w-md space-y-4 p-4">
  <h1 class="text-2xl font-semibold">Admin Settings</h1>
  <Card>
    <CardHeader>
      <CardTitle>Default Slots</CardTitle>
      <CardDescription>
        These are the default settings that will be used to create new slots. To make changes click
        the edit button and update the fields accordingly.
      </CardDescription>
    </CardHeader>
    <CardContent>
      {#if desktop.current}
        <Dialog>
          {@render defaultSlotsTable()}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>title</DialogTitle>
              <DialogDescription>description</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>cancel</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      {:else}
        <Sheet>
          {@render defaultSlotsTable()}
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>title</SheetTitle>
              <SheetDescription>description</SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose>cancel</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      {/if}
    </CardContent>
  </Card>
</PageWrapper>
