<script lang="ts">
  import { page } from '$app/state';
  import { Button } from '$lib/components/ui/button';
  import { CalendarPlus, History, Home, type Icon as IconType, Settings } from 'lucide-svelte';

  type NavItem = {
    href: string;
    label: string;
    icon: typeof IconType;
  };
  const navItems: NavItem[] = [
    {
      href: '/home',
      label: 'Home',
      icon: Home,
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
</script>

<!-- Mobile bottom nav -->
<nav class="bg-background fixed bottom-0 left-0 right-0 z-50 border-t p-2 md:hidden">
  <ul class="flex items-center justify-around">
    {#each navItems as item}
      {@const Icon = item.icon}
      <li>
        <Button
          variant="ghost"
          href={item.href}
          class={page.url.pathname === item.href ? 'bg-accent' : ''}
        >
          <Icon class="h-5 w-5" />
          <span class="text-xs">{item.label}</span>
        </Button>
      </li>
    {/each}
  </ul>
</nav>

<!-- Desktop top nav -->
<nav class="bg-background hidden border-b md:block">
  <div class="mx-auto flex items-center justify-between gap-6 px-6 pb-3">
    <span class="text-xl font-semibold">
      {#if page.url.pathname.startsWith('/admin')}
        Gideon Admin Portal
      {:else}
        Gideon Employee Portal
      {/if}
    </span>
    <ul class="flex items-center gap-4">
      {#each navItems as item}
        <li>
          <Button
            variant="ghost"
            href={item.href}
            class={page.url.pathname.startsWith(item.href) ? 'bg-accent' : ''}
          >
            <item.icon />
            {item.label}
          </Button>
        </li>
      {/each}
    </ul>
  </div>
</nav>
