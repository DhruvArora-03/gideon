<script lang="ts">
  import { page } from '$app/state';
  import { Button } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import {
    CalendarCog,
    CalendarPlus,
    DoorClosed,
    DoorOpen,
    History,
    House,
    type Icon,
    LayoutDashboard,
    Settings,
    Users,
  } from '@lucide/svelte';

  type Props = {
    showAdmin: boolean;
  };
  const { showAdmin }: Props = $props();

  type NavItem = {
    href: string;
    label: string;
    icon: typeof Icon;
  };

  const navItems: NavItem[] = [
    {
      href: '/home',
      label: 'Home',
      icon: House,
    },
    {
      href: '/signup',
      label: 'Sign Up',
      icon: CalendarPlus,
    },
    {
      href: '/history',
      label: 'History',
      icon: History,
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const adminNavItems: NavItem[] = [
    {
      href: '/home',
      label: 'Home',
      icon: DoorOpen,
    },
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/users',
      label: 'Users',
      icon: Users,
    },
    {
      href: '/admin/slots',
      label: 'Slots',
      icon: CalendarCog,
    },
    {
      href: '/admin/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];
</script>

<!-- Mobile bottom nav -->
{#snippet bottomNavItem(item: NavItem)}
  {@const Icon = item.icon}
  <li>
    <Button
      variant="ghost"
      href={item.href}
      class={cn(page.url.pathname === item.href && 'bg-accent', 'flex h-fit flex-col gap-1')}
    >
      <Icon size={20} />
      <span class="text-2xs">{item.label}</span>
    </Button>
  </li>
{/snippet}

<nav class="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-2 md:hidden">
  <ul class="flex items-center justify-around">
    {#if page.url.pathname.startsWith('/admin')}
      {#each adminNavItems as item}
        {@render bottomNavItem(item)}
      {/each}
    {:else}
      {#if showAdmin}
        {@render bottomNavItem({
          href: '/admin/dashboard',
          label: 'Admin',
          icon: DoorClosed,
        })}
      {/if}

      {#each navItems as item}
        {@render bottomNavItem(item)}
      {/each}
    {/if}
  </ul>
</nav>

<!-- Desktop top nav -->
{#snippet topNavItem(item: NavItem)}
  {@const Icon = item.icon}
  <li>
    <Button
      variant="ghost"
      href={item.href}
      class={page.url.pathname.startsWith(item.href) ? 'bg-accent' : ''}
    >
      <Icon class="mr-2" size={20} />
      <span>{item.label}</span>
    </Button>
  </li>
{/snippet}

<nav class="hidden border-b bg-background md:block">
  <div class="mx-auto flex items-center justify-between gap-6 px-6 pb-3">
    <span class="text-xl font-semibold">
      {#if page.url.pathname.startsWith('/admin')}
        Admin Portal
      {:else}
        Employee Portal
      {/if}
    </span>
    <ul class="flex items-center gap-4">
      {#if page.url.pathname.startsWith('/admin')}
        {#each adminNavItems as item}
          {@render topNavItem(item)}
        {/each}
      {:else}
        {#if showAdmin}
          {@render topNavItem({
            href: '/admin/dashboard',
            label: 'Admin Portal',
            icon: DoorClosed,
          })}
        {/if}

        {#each navItems as item}
          {@render topNavItem(item)}
        {/each}
      {/if}
    </ul>
  </div>
</nav>
