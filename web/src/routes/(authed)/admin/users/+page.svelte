<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { Button } from '$lib/components/ui/button';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '$lib/components/ui/table';
  import { Edit } from '@lucide/svelte';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';
  import RoleBadge from '$lib/components/RoleBadge.svelte';
  import InviteUser from '$lib/components/InviteUser.svelte';

  type Props = {
    data: PageData;
  };
  const { data }: Props = $props();
</script>

<PageWrapper class="mx-auto max-w-screen-lg space-y-4 py-4">
  <div class="flex flex-col justify-between gap-2 md:flex-row">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Manage Users</h1>
      <p class="text-muted-foreground text-sm">
        View user info here; to make changes to a user click on their corresponding row
      </p>
    </div>
    <InviteUser form={data.form} />
  </div>

  {#await data.users}
    <div>Loading...</div>
  {:then users}
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead class="hidden md:table-cell">Email</TableHead>
          <TableHead class="hidden md:table-cell">Phone Number</TableHead>
          <TableHead class="sr-only">Edit</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {#each users as userInfo (userInfo.id)}
          <TableRow onclick={() => goto('/admin/users/' + userInfo.id)}>
            <TableCell>
              {`${userInfo.first_name} ${userInfo.last_name}`}
            </TableCell>
            <TableCell>
              <RoleBadge {userInfo} />
            </TableCell>
            <TableCell class="hidden md:table-cell">{userInfo.email}</TableCell>
            <TableCell class="hidden md:table-cell">{userInfo.phone_number}</TableCell>
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
</PageWrapper>
