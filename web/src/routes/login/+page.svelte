<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import { Control, Description, Field, FieldErrors, Label } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { loginFormSchema } from '$lib/validation';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Turnstile } from 'svelte-turnstile';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
  import { LoaderCircle, LogIn } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button/';

  let { data } = $props();

  const form = superForm(data.form, {
    validators: zodClient(loginFormSchema),
  });

  const { form: formData, message, enhance, submitting } = form;
</script>

<h1 class="sr-only">Login Page</h1>
<PageWrapper class="flex items-center justify-center">
  <Card>
    <CardHeader>
      <CardTitle>Log in</CardTitle>
      <CardDescription>Welcome back! Use your credentials to log in</CardDescription>
    </CardHeader>
    <CardContent>
      <form method="POST" use:enhance>
        <Field {form} name="email">
          <Control let:attrs>
            <Label>
              <span class="sr-only">Email</span>
              <Input
                {...attrs}
                bind:value={$formData.email}
                placeholder="johndoe@example.com"
                disabled={$submitting}
              />
            </Label>
          </Control>
          <Description class="sr-only">The email address associated with your account</Description>
          <FieldErrors />
        </Field>
        <Field {form} name="password">
          <Control let:attrs>
            <Label>
              <span class="sr-only">Password</span>
              <Input
                {...attrs}
                bind:value={$formData.password}
                placeholder="super-secret-password"
                type="password"
                disabled={$submitting}
              />
            </Label>
          </Control>
          <Description class="sr-only">The password associated with your account</Description>
          <FieldErrors />
        </Field>
        <Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} size="flexible" />
        {#if $message}
          <p class="mt-4">
            {$message}
          </p>
        {/if}
        <!-- <Button class="mt-2 w-full" type="submit" disabled={$submitting}>
          {#if $submitting}
            <LoaderCircle class="animate-spin" /> Verifying Login...
          {:else}
            <LogIn /> Log in
          {/if}
        </Button> -->
        <Button
          class="mt-2 w-full"
          onclick={() => {
            fetch('https://www.google.com/', {
              mode: 'no-cors',
            })
              .then(() => {
                alert('pinged google');
              })
              .catch((err) => {
                alert('error pinging google');
                alert(err);
              });
          }}
        >
          ping google
        </Button>
      </form>
    </CardContent>
  </Card>
</PageWrapper>
