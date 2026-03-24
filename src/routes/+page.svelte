<script lang="ts">
    import Button from "$lib/components/ui/Button.svelte";
    import IconButton from "$lib/components/ui/IconButton.svelte";
</script>

<section class="flex-1 flex flex-col items-center justify-center px-8 pb-12 relative min-h-full">
    <div class="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <div class="w-[850px] h-[850px] border-[1px] border-primary rounded-full animate-pulse-slow"></div>
    </div>
    
    <div class="relative w-full max-w-2xl flex flex-col items-center gap-8 my-auto pt-10 lg:pt-0">
        <div class="w-full text-center flex flex-col items-center gap-4">
            <span class="text-[10px] font-headline uppercase tracking-[0.4em] text-outline/60 font-medium">Current Objective</span>
            <div class="flex flex-col items-center">
                <h2 class="text-2xl md:text-3xl font-headline font-bold text-on-surface uppercase tracking-wider text-center">Engineering Focus Protocol...</h2>
            </div>
        </div>

        <div class="flex flex-col items-center gap-10">
            <div class="px-5 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <span class="text-[12px] font-headline font-bold uppercase tracking-[0.3em] text-primary">Work</span>
            </div>

            <div class="relative group scale-75 sm:scale-90 md:scale-100">
                <svg class="w-[420px] h-[420px] transform -rotate-90">
                    <circle class="text-surface-container" cx="210" cy="210" fill="transparent" r="200" stroke="currentColor" stroke-width="2"></circle>
                    <circle class="text-primary transition-all duration-1000" cx="210" cy="210" fill="transparent" r="200" stroke="currentColor" stroke-dasharray="1256" stroke-dashoffset="400" stroke-linecap="round" stroke-width="8"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-8xl md:text-9xl font-headline font-bold tracking-tighter text-on-surface">42:18</span>
                </div>
                <div class="absolute -inset-12 bg-primary/5 rounded-full blur-3xl opacity-40"></div>
            </div>

            <div class="flex flex-col items-center gap-8 w-full z-20">
                <div class="flex items-center justify-center gap-4 sm:gap-8">
                    <IconButton icon="refresh" variant="controls" />
                    <Button text="Engage Focus" variant="primary" />
                    <IconButton icon="stop" variant="controls-danger" />
                </div>

                <div class="flex items-center gap-6">
                    <Button text="-5M" variant="outline" />
                    <Button text="+5M" variant="outline" />
                </div>
            </div>
        </div>
    </div>
</section>
