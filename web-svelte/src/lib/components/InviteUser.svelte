<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Control, Description, Field, FieldErrors, Label } from '$lib/components/ui/form';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { inviteFormSchema } from '$lib/validation';
  import { LoaderCircle, Send } from 'lucide-svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';

  type Props = {
    data: SuperValidated<Infer<typeof inviteFormSchema>>;
  };
  let { data }: Props = $props();

  const form = superForm(data, {
    validators: zodClient(inviteFormSchema),
  });

  const { form: formData, message, enhance, submitting } = form;
</script>

<Card class="max-w-md">
  <CardHeader>
    <CardTitle>Invite User</CardTitle>
    <CardDescription>
      New users can be configured here and invited with their email address
    </CardDescription>
  </CardHeader>
  <CardContent>
    <form method="POST" action="?/invite" use:enhance>
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
      <Button class="mt-4 w-full" type="submit" disabled={$submitting}>
        {#if $submitting}
          <LoaderCircle class="animate-spin" /> Sending Invite...
        {:else}
          <Send /> Send Invite
        {/if}
      </Button>
    </form>
  </CardContent>
</Card>
