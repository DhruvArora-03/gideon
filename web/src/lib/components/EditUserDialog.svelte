<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { Button, buttonVariants } from '$lib/components/ui/button';
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
  import { USER_ROLES } from '$lib/models';
  import type { Profile } from '$lib/server/db/schema';
  import { cn } from '$lib/utils';
  import { updateAccountDetailsSchema, type UpdateAccountDetailsSchema } from '$lib/validation';
  import { EditIcon } from 'lucide-svelte';
  import { superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  type Props = {
    class?: string;
    form: SuperValidated<UpdateAccountDetailsSchema>;
    userInfo: Profile;
  };
  const props: Props = $props();

  const form = superForm(props.form, {
    validators: zodClient(updateAccountDetailsSchema),
    resetForm: false,
    onResult: (e) => {
      if (e.result.type === 'success') {
        invalidateAll();
      } else if (e.result.type === 'error') {
        alert('error');
      }
    },
  });

  const { form: formData, message, enhance, submitting, tainted } = form;

  let isDirty = $derived(
    $tainted?.first_name ||
      $tainted?.last_name ||
      $tainted?.email ||
      $tainted?.phone_number ||
      $tainted?.role ||
      false,
  );
</script>

<Dialog
  onOpenChange={() => {
    form.reset({
      data: {
        first_name: props.userInfo.first_name,
        last_name: props.userInfo.last_name,
        email: props.userInfo.email,
        phone_number: props.userInfo.phone_number,
        role: props.userInfo.role,
      },
    });
  }}
>
  <DialogTrigger class={cn(buttonVariants({ variant: 'default' }), props.class)}>
    <EditIcon size={16} class="mr-2" /> Edit User Info
  </DialogTrigger>

  <DialogContent
    escapeKeydownBehavior={isDirty ? 'ignore' : 'close'}
    interactOutsideBehavior={isDirty ? 'ignore' : 'close'}
  >
    <DialogHeader>
      <DialogTitle>Account Details</DialogTitle>
      <DialogDescription>You can update the current user's information here.</DialogDescription>
    </DialogHeader>

    <form class="flex flex-col gap-2" method="POST" action="?/updateAccountDetails" use:enhance>
      <div class="flex gap-4">
        <Field {form} name="first_name">
          <Control let:attrs>
            <Label>
              <div class="mb-2">First Name</div>
              <Input
                {...attrs}
                bind:value={$formData.first_name}
                autofocus={true}
                disabled={$submitting}
              />
            </Label>
          </Control>
          <Description class="sr-only">User's first name</Description>
          <FieldErrors />
        </Field>

        <Field {form} name="last_name">
          <Control let:attrs>
            <Label>
              <div class="mb-2">Last Name</div>
              <Input {...attrs} bind:value={$formData.last_name} disabled={$submitting} />
            </Label>
          </Control>
          <Description class="sr-only">User's last name</Description>
          <FieldErrors />
        </Field>
      </div>

      <Field {form} name="email">
        <Control let:attrs>
          <Label>
            <div class="mb-2">Email</div>
            <Input
              {...attrs}
              bind:value={$formData.email}
              autocomplete="off"
              disabled={$submitting}
            />
          </Label>
        </Control>
        <Description class="sr-only">User's email address</Description>
        <FieldErrors />
      </Field>

      <Field {form} name="phone_number">
        <Control let:attrs>
          <Label>
            <div class="mb-2">Phone Number</div>
            <Input
              {...attrs}
              bind:value={$formData.phone_number}
              inputmode="tel"
              disabled={$submitting}
            />
          </Label>
        </Control>
        <Description class="sr-only">User's phone number</Description>
        <FieldErrors />
      </Field>

      <Field {form} name="role">
        <Control let:attrs>
          <Label>
            <div class="mb-2">Role</div>
            <Select type="single" {...attrs} bind:value={$formData.role} disabled={$submitting}>
              <SelectTrigger class="max-w-40">
                {$formData.role}
              </SelectTrigger>
              <SelectContent class="max-w-40">
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  {#each USER_ROLES as role (role)}
                    <SelectItem value={role}>{role}</SelectItem>
                  {/each}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Label>
        </Control>
        <Description class="sr-only">User's role</Description>
        <FieldErrors />
      </Field>

      {#if $message}
        <p class="mt-4">
          {$message}
        </p>
      {/if}

      <DialogFooter>
        <DialogClose>
          <Button class="ml-auto" type="button" variant="secondary">Cancel</Button>
        </DialogClose>
        <Button class="ml-2" type="submit" disabled={$submitting || !isDirty}>Save Changes</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
