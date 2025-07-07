<script lang="ts">
    import RoleBadge from '$lib/components/RoleBadge.svelte';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Control, Description, Field, FieldErrors, Label } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
  } from '$lib/components/ui/select';
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from '$lib/components/ui/sheet';
  import { USER_ROLES } from '$lib/models';
  import { cn } from '$lib/utils';
  import { inviteFormSchema, type InviteFormSchema } from '$lib/validation';
  import { LoaderCircleIcon, MailPlusIcon, Send } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  import { MediaQuery } from 'svelte/reactivity';
  import { superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  type Props = {
    class?: string;
    form: SuperValidated<InviteFormSchema>;
  };
  const props: Props = $props();

  const form = superForm(props.form, {
    validators: zodClient(inviteFormSchema),
    onResult: ({ result, cancel }) => {
      if (result.type === 'success') {
        toast.success('User invited successfully', {
          description: result.data?.form.message,
        });
      } else if (result.type === 'error') {
        cancel();
        toast.error('An error occurred, try again later', {
          description: result.error?.message || 'An unknown error occurred',
        });
      }
    },
  });

  const { form: formData, message, enhance, submitting, tainted } = form;

  const desktop = new MediaQuery('(min-width: 768px)');

  let isDirty = $state(false);
  tainted.subscribe(
    (t) => (isDirty = t?.first_name || t?.last_name || t?.email || t?.phone_number || false),
  );
</script>

<Sheet
  onOpenChange={() => {
    form.reset();
  }}
>
  <SheetTrigger class={buttonVariants({ variant: 'default' })}>
    <MailPlusIcon class="mr-2" size={16} />Invite New User
  </SheetTrigger>

  <SheetContent
    escapeKeydownBehavior={isDirty ? 'ignore' : 'close'}
    interactOutsideBehavior={isDirty ? 'ignore' : 'close'}
    side={desktop.current ? 'right' : 'bottom'}
  >
    <SheetHeader>
      <SheetTitle>Invite User</SheetTitle>
      <SheetDescription>
        New users can be configured here and invited with their email address; confirm changes once
        done or press cancel to exit.
      </SheetDescription>
    </SheetHeader>

    <form class="m-4 flex flex-col gap-2" method="POST" action="?/invite" use:enhance>
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

      <Field {form} name="role">
        <Control let:attrs>
          <Label>
            <div class="mb-2">Role</div>
            <Select type="single" {...attrs} bind:value={$formData.role} disabled={$submitting}>
              <SelectTrigger class="w-36">
                <RoleBadge role={$formData.role} />
              </SelectTrigger>
              <SelectContent class="w-36">
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  {#each USER_ROLES as role (role)}
                    <SelectItem value={role}><RoleBadge {role} /></SelectItem>
                  {/each}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Label>
        </Control>
        <Description class="sr-only">The new user's role</Description>
        <FieldErrors />
      </Field>

      {#if $message}
        <p class="mt-4">
          {$message}
        </p>
      {/if}

      <SheetFooter class="flex flex-row">
        <SheetClose class={cn(buttonVariants({ variant: 'secondary' }), 'ml-auto')} type="reset">
          Cancel
        </SheetClose>
        <Button type="submit" disabled={$submitting}>
          {#if $submitting}
            <LoaderCircleIcon size={16} class="mr-2 animate-spin" /> Sending...
          {:else}
            <Send size={16} class="mr-2" /> Send Invite
          {/if}
        </Button>
      </SheetFooter>
    </form>
  </SheetContent>
</Sheet>
