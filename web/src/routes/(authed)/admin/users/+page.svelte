<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Control, Description, Field, FieldErrors, Label } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
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
  import { inviteFormSchema } from '$lib/validation';
  import { Edit, Plus, Send } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { MediaQuery } from 'svelte/reactivity';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';
  import { cn } from '$lib/utils';
  import { goto } from '$app/navigation';

  type Props = {
    data: PageData;
  };
  const { data }: Props = $props();

  const desktop = new MediaQuery('(min-width: 768px)');

  let open = $state(false);
  let isDirty = $state(false);

  const form = superForm(data.form, {
    validators: zodClient(inviteFormSchema),
    onSubmit: () => {
      toast.info('Invite being processed...', {
        description: `Please wait while we create the user and send an invite to ${$formData.email}`,
      });
    },

    onResult: ({ result }) => {
      if (result.type === 'success') {
        toast.success('User invited successfully', {
          description: result.data?.form.message,
        });
      } else if (result.type === 'failure') {
        console.log('Result data:', result.data?.form);

        toast.error('Invitation failed', {
          description: result.data?.form.message || 'An unknown failure occurred',
        });
      } else if (result.type === 'error') {
        toast.error('An error occurred', {
          description: result.error?.message || 'An unknown error occurred',
        });
      }
    },
  });

  const { form: formData, message, enhance, submitting, tainted } = form;

  tainted.subscribe(
    (t) => (isDirty = (t?.first_name || t?.last_name || t?.email || t?.phone_number) ?? false),
  );
</script>

<PageWrapper class="space-y-4 p-4">
  <div class="space-y-2">
    <h1 class="text-2xl font-semibold">Manage Users</h1>
    <p class="text-muted-foreground text-sm">
      View user info here; to make changes to a user, click on their corresponding row
    </p>
  </div>

  {#await data.users}
    Loading...
  {:then users}
    <div class="mb-2 ml-auto w-fit">
      <Button onclick={() => (open = true)}>
        <Plus class="mr-2" size={16} />Invite New User
      </Button>
    </div>

    <Table>
      <TableHeader class="border-1">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone #</TableHead>
          <TableHead colspan={2}>Role</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody class="border-1">
        {#each users as u (u.id)}
          <TableRow
            class={!u.active ? 'bg-muted' : ''}
            onclick={() => goto('/admin/users/' + u.id)}
          >
            <TableCell>{`${u.first_name} ${u.last_name}`}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.phone_number}</TableCell>
            <TableCell>
              {u.role}
              {#if !u.active}
                <span class="text-destructive">{' '}(deactivated)</span>
              {/if}
            </TableCell>
            <TableCell align="right">
              <Button variant="ghost">
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
    onOpenChange={(open) => {
      if (!open) {
        form.reset();
      }
    }}
  >
    <SheetContent
      escapeKeydownBehavior={isDirty ? 'ignore' : 'close'}
      interactOutsideBehavior={isDirty ? 'ignore' : 'close'}
      side={desktop.current ? 'right' : 'bottom'}
    >
      <SheetHeader>
        <SheetTitle>Invite User</SheetTitle>
        <SheetDescription>
          New users can be configured here and invited with their email address; confirm changes
          once done or press cancel to exit.
        </SheetDescription>
      </SheetHeader>

      <form class="mt-4 flex flex-col gap-2" method="POST" action="?/invite" use:enhance>
        <Field {form} name="first_name">
          <Control let:attrs>
            <Label>
              First Name
              <Input
                {...attrs}
                bind:value={$formData.first_name}
                placeholder="John"
                disabled={$submitting}
              />
            </Label>
          </Control>
          <Description class="sr-only">The new user's first name</Description>
          <FieldErrors />
        </Field>

        <Field {form} name="last_name">
          <Control let:attrs>
            <Label>
              Last Name
              <Input
                {...attrs}
                bind:value={$formData.last_name}
                placeholder="Doe"
                disabled={$submitting}
              />
            </Label>
          </Control>
          <Description class="sr-only">The new user's last name</Description>
          <FieldErrors />
        </Field>

        <Field {form} name="email">
          <Control let:attrs>
            <Label>
              Email
              <Input
                {...attrs}
                bind:value={$formData.email}
                placeholder="johndoe@example.com"
                disabled={$submitting}
              />
            </Label>
          </Control>
          <Description class="sr-only">
            The new user's email address; they will receive an invite email
          </Description>
          <FieldErrors />
        </Field>

        <Field {form} name="phone_number">
          <Control let:attrs>
            <Label>
              Phone Number
              <Input
                {...attrs}
                bind:value={$formData.phone_number}
                placeholder="555-555-5555"
                disabled={$submitting}
              />
            </Label>
          </Control>
          <Description class="sr-only">The new user's phone number</Description>
          <FieldErrors />
        </Field>

        {#if $message}
          <p class="mt-4">
            {$message}
          </p>
        {/if}

        <SheetFooter>
          <SheetClose>
            <Button type="reset" variant="secondary">Cancel</Button>
          </SheetClose>
          <Button type="submit" disabled={$submitting}>
            <Send size={16} class="mr-2" /> Send Invite
          </Button>
        </SheetFooter>
      </form>
    </SheetContent>
  </Sheet>
</PageWrapper>
