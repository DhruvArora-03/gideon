<script lang="ts">
  import PasswordInput from '$lib/components/PasswordInput.svelte';
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import { Field, Control, Description, FieldErrors } from '$lib/components/ui/form';
  import { Label } from '$lib/components/ui/label';
  import { changePasswordFormSchema, type ChangePasswordFormSchema } from '$lib/validation';
  import { LockKeyhole } from '@lucide/svelte';
  import { superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  type Props = {
    form: SuperValidated<ChangePasswordFormSchema>;
    class?: string;
  };
  const props: Props = $props();

  const form = superForm(props.form, {
    validators: zodClient(changePasswordFormSchema),
  });

  const { form: formData, message, enhance, submitting } = form;
</script>

<Card class={props.class}>
  <CardHeader>
    <CardTitle>Change Password</CardTitle>
    <CardDescription>
      Minimum 8 characters. Must use uppercase, lowercase, number, and special characters.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <form class="flex flex-col gap-2" method="POST" action="/settings/change-password" use:enhance>
      <Field {form} name="new_password">
        <Control let:attrs>
          <Label>
            <span class="sr-only">Password</span>
            <PasswordInput
              {...attrs}
              bind:value={$formData.new_password}
              placeholder="New Password"
              disabled={$submitting}
            />
          </Label>
        </Control>
        <Description class="sr-only">Your new password</Description>
        <FieldErrors />
      </Field>
      <Field {form} name="confirm_new_password">
        <Control let:attrs>
          <Label>
            <span class="sr-only">Repeat</span>
            <PasswordInput
              {...attrs}
              bind:value={$formData.confirm_new_password}
              placeholder="Repeat New Password"
              disabled={$submitting}
            />
          </Label>
        </Control>
        <Description class="sr-only">Repeat your new password</Description>
        <FieldErrors />
      </Field>
      {#if $message}
        <p class="mt-4">
          {$message}
        </p>
      {/if}
      <Button class="mt-4 w-full" type="submit">
        <LockKeyhole class="mr-2" size={16} /> Confirm Password Change
      </Button>
    </form>
  </CardContent>
</Card>
