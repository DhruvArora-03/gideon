<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import type { VariantProps } from 'tailwind-variants';
  import { getEmblaContext } from './context.js';
  import { cn } from '$lib/utils.js';
  import { Button, type Props, type buttonVariants } from '$lib/components/ui/button/index.js';

  type $$Props = Props & {
    disableDefaultPositioning?: boolean;
  };

  let className: $$Props['class'] = undefined;
  export { className as class };
  export let variant: VariantProps<typeof buttonVariants>['variant'] = 'outline';
  export let size: VariantProps<typeof buttonVariants>['size'] = 'icon';
  export let disableDefaultPositioning: $$Props['disableDefaultPositioning'] = false;

  const { orientation, canScrollPrev, scrollPrev, handleKeyDown } =
    getEmblaContext('<Carousel.Previous/>');
</script>

<Button
  {variant}
  {size}
  class={cn(
    !disableDefaultPositioning && 'absolute',
    !disableDefaultPositioning &&
      ($orientation === 'horizontal'
        ? '-left-12 top-1/2 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2'),
    'h-8 w-8 touch-manipulation rounded-full',
    $orientation === 'vertical' && 'rotate-90',
    className,
  )}
  disabled={!$canScrollPrev}
  on:click={scrollPrev}
  on:keydown={handleKeyDown}
  {...$$restProps}
>
  <ArrowLeft class="m-0 h-4 w-4" />
  <span class="sr-only">Previous slide</span>
</Button>
