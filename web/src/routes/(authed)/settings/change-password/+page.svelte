<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
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
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { changePasswordFormSchema } from '$lib/validation';
  import { LockKeyhole } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  let { data } = $props();

  const form = superForm(data.form, {
    validators: zodClient(changePasswordFormSchema),
  });

  const { form: formData, message, enhance, submitting } = form;
</script>

<PageWrapper
  class="flex items-center justify-center"
  previousHref="/dashboard/settings"
  previousPageTitle="Settings"
>
  <Card class="max-w-sm">
    <CardHeader>
      <CardTitle>Reset Password</CardTitle>
      <CardDescription>
        Minimum 8 characters. Must use uppercase, lowercase, number, and special characters.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form class="flex flex-col gap-2" method="POST" use:enhance>
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
        <Button class="mt-4 w-full " type="submit">
          <LockKeyhole /> Confirm Password Change
        </Button>
      </form>
    </CardContent>
  </Card>
</PageWrapper>
