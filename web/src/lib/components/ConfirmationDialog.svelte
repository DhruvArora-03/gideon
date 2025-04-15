<script lang="ts">
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '$lib/components/ui/dialog';

  type Props = {};
  const {}: Props = $props();
</script>

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
