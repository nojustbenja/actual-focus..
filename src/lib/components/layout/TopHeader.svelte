<script lang="ts">
    import IconButton from "../ui/IconButton.svelte";
    import { globalTimer } from "$lib/state/timer.svelte";
</script>

<header class="col-span-2 lg:col-span-3 row-start-1 bg-surface-container-lowest z-40 grid grid-cols-2 md:grid-cols-3 items-center px-8 border-b border-outline-variant/10">
    <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
            <span class="material-symbols-outlined text-primary text-xl">biotech</span>
        </div>
        <h1 class="text-2xl font-headline font-bold tracking-tight text-primary hidden sm:block">Actual Focus...</h1>
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
        <IconButton icon="bolt" variant="header" />
        <div class="w-10 h-10 rounded-full overflow-hidden border border-primary/20 p-0.5">
            <img alt="portrait" class="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIit3VhHY2ZLwWYVn5HguNVkoXqvUgkKfPBUfJn5q73MYMTFa9Y8Djnam-ACjO3Za8Srx-pjWNR5dhSixfT8zYS9fMZcrMk8mcEAHdAU2ocjUUKt9PceG6R9C7uvUXeAcPsv3KR_DSxH5dr9cuId0LjS6rJqfycnE4O23w-uLEibsUVGzcdo5hjJI5PsaPctQpDw29Bx9yOa2JIcw1tvFn9dNQs5Wx9kDQ8Um8NwRhU1OlrjYWLnbUOrd6db2FjnBXPWC99p-SWaY"/>
        </div>
    </div>
</header>
