<script lang="ts">
    import IconButton from "../ui/IconButton.svelte";
</script>

<aside class="col-start-1 row-start-2 bg-surface-container-lowest z-20 hidden md:flex flex-col py-6 items-center gap-8">
    <nav class="flex flex-col gap-6">
        <IconButton icon="target" tooltip="Focus" active={true} />
        <IconButton icon="biotech" tooltip="Training" />
        <IconButton icon="filter_hdr" tooltip="Sanctuary" />
        <IconButton icon="battery_charging_full" tooltip="Capacity" />
        <IconButton icon="menu_book" tooltip="Journal" />
    </nav>
    <div class="mt-auto flex flex-col items-center gap-8 pb-4">
        <IconButton icon="settings" tooltip="Settings" />
    </div>
</aside>
