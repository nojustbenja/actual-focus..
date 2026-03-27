<script lang="ts">
    import IconButton from "../ui/IconButton.svelte";
    import { globalTimer } from "$lib/state/timer.svelte";
</script>

<header class="col-span-2 lg:col-span-3 row-start-1 bg-surface-container-lowest z-40 grid grid-cols-2 md:grid-cols-3 items-center px-8 border-b border-outline-variant/10">
    <div class="flex items-center gap-3">
        <h1 class="text-2xl font-headline font-bold tracking-tight text-primary">Actual Focus...</h1>
    </div>
    
    <div class="hidden md:flex justify-center">
        <div class="flex items-center gap-2.5 bg-primary/10 px-5 py-2 rounded-full border border-primary/30 status-glow transition-all hover:bg-primary/20 cursor-default">
            <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-[18px]">timer</span>
                <span class="text-sm font-headline font-bold tracking-[0.1em] text-primary">{globalTimer.formattedTime}</span>
            </div>
        </div>
    </div>
    
    <div class="flex items-center gap-6 justify-self-end">
        <!-- Profile/Bolt removed for focus -->
    </div>
</header>
