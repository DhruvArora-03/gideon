<script lang="ts">
  import { invalidate } from '$app/navigation';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import { Control, Description, Field, FieldErrors, Label } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectInput,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '$lib/components/ui/select';
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
  } from '$lib/components/ui/sheet';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '$lib/components/ui/table';
  import { DAYS, formatDotw, formatTime, parseTime } from '$lib/date';
  import { updateDefaultSlotSchema } from '$lib/validation';
  import { Edit, Plus } from 'lucide-svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';

  type Props = {
    data: PageData;
  };
  const { data }: Props = $props();

  const desktop = new MediaQuery('(min-width: 768px)');

  let current = $state<number | null>(null);
  let open = $state(false);
  let isDirty = $state(false);

  const form = superForm(data.form, {
    validators: zodClient(updateDefaultSlotSchema),
    onResult: (e) => {
      if (e.result.type === 'success') {
        invalidate('data:default-slots');
        open = false;
      }
    },
  });

  const { form: formData, message, enhance, submitting } = form;

  form.tainted.subscribe((t) => {
    isDirty = (t?.capacity || t?.end_time || t?.start_time || t?.dotw) ?? false;
  });
</script>

<PageWrapper class="mx-auto max-w-md space-y-4 p-4">
  <h1 class="text-2xl font-semibold">Admin Settings</h1>

  <Card class="border-none shadow-none [&>*]:px-0 sm:[&>*]:px-6">
    <CardHeader>
      <CardTitle>Default Shifts</CardTitle>
      <CardDescription>
        These are the default settings that will be used to create new shifts. To make changes click
        the edit button and update the fields accordingly.
      </CardDescription>
    </CardHeader>

    <CardContent>
      {#await data.defaultSlots}
        Loading...
      {:then slots}
        <Button
          class="mb-2 w-full"
          onclick={() => {
            open = true;
          }}
        >
          <Plus class="mr-2" size={16} /> Create New Default Shift
        </Button>

        <Table>
          <TableHeader class="border-1">
            <TableRow>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead colspan={2}>Capacity</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody class="border-1">
            {#each slots as s, i (s.id)}
              {#if i === 0 || slots[i - 1].dotw !== s.dotw}
                <TableRow class="bg-secondary text-secondary-foreground">
                  <TableCell colspan={4} class="font-semibold">{formatDotw(s.dotw)}</TableCell>
                </TableRow>
              {/if}
              <TableRow>
                <TableCell class="pl-4">{formatTime(parseTime(s.start_time))}</TableCell>
                <TableCell>{formatTime(parseTime(s.end_time))}</TableCell>
                <TableCell>{s.capacity}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="ghost"
                    onclick={() => {
                      current = s.id;
                      form.reset({
                        data: {
                          dotw: s.dotw,
                          start_time: s.start_time.substring(0, 5),
                          end_time: s.end_time.substring(0, 5),
                          capacity: s.capacity,
                        },
                      });
                      open = true;
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      {/await}

      <Sheet
        bind:open
        closeOnEscape={!isDirty}
        closeOnOutsideClick={!isDirty}
        onOpenChange={(v) => {
          if (!v) {
            current = null;
            form.reset();
          }
        }}
      >
        <SheetContent side={desktop.current ? 'right' : 'bottom'}>
          <SheetHeader class="text-left">
            <SheetTitle>Edit</SheetTitle>
            <SheetDescription>
              Editing default shift; confirm changes once done or press cancel to exit.
            </SheetDescription>
          </SheetHeader>

          <form
            class="mt-4 flex flex-col gap-2"
            method="POST"
            action={current === null ? '?/createDefaultSlot' : '?/updateDefaultSlot'}
            use:enhance
          >
            {#if current !== null}
              <input hidden name="defaultSlotId" value={current} />
            {/if}

            <Field {form} name="dotw">
              <Control let:attrs>
                <Label>
                  <div class="mb-2">Day</div>
                  <Select
                    selected={{
                      value: $formData.dotw,
                      label: DAYS[$formData.dotw],
                    }}
                    onSelectedChange={(res) => {
                      if (res) {
                        $formData.dotw = res?.value;
                      }
                    }}
                    disabled={$submitting}
                  >
                    <SelectTrigger class="max-w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Day</SelectLabel>
                        {#each DAYS as day, i (day)}
                          <SelectItem value={i}>{day}</SelectItem>
                        {/each}
                      </SelectGroup>
                    </SelectContent>
                    <SelectInput {...attrs} bind:value={$formData.dotw} />
                  </Select>
                </Label>
              </Control>
              <Description class="sr-only">Day of the week</Description>
              <FieldErrors />
            </Field>

            <div class="flex gap-4">
              <Field {form} name="start_time">
                <Control let:attrs>
                  <Label>
                    <div class="mb-2">Start Time</div>
                    <Input
                      {...attrs}
                      type="time"
                      bind:value={$formData.start_time}
                      disabled={$submitting}
                    />
                  </Label>
                </Control>
                <Description class="sr-only">Shift start time</Description>
                <FieldErrors />
              </Field>

              <Field {form} name="end_time">
                <Control let:attrs>
                  <Label>
                    <div class="mb-2">End Time</div>
                    <Input
                      {...attrs}
                      type="time"
                      bind:value={$formData.end_time}
                      disabled={$submitting}
                    />
                  </Label>
                </Control>
                <Description class="sr-only">Shift end time</Description>
                <FieldErrors />
              </Field>
            </div>

            <Field {form} name="capacity">
              <Control let:attrs>
                <Label>
                  <div class="mb-2">Capacity</div>
                  <Input
                    {...attrs}
                    type="number"
                    class="max-w-40"
                    bind:value={$formData.capacity}
                    disabled={$submitting}
                  />
                </Label>
              </Control>
              <Description class="sr-only">Maximum capacity for a shift</Description>
              <FieldErrors />
            </Field>

            {#if $message}
              <p class="mt-4">
                {$message}
              </p>
            {/if}

            <SheetFooter class="mt-4 flex flex-row justify-end gap-2">
              <SheetClose>
                <Button type="reset" variant="secondary">Cancel</Button>
              </SheetClose>
              <Button type="submit">Save Changes</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </CardContent>
  </Card>
</PageWrapper>
