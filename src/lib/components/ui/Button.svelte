<script lang="ts">
    let { 
        text, 
        variant = 'primary', // primary, outline
        onclick = undefined
    }: {
        text: string;
        variant?: 'primary' | 'outline';
        onclick?: ((event: MouseEvent) => void) | undefined | null;
    } = $props();

    function getClasses() {
        if (variant === 'primary') {
            return "px-14 py-5 bg-[#b0ceb4] rounded-full flex items-center justify-center shadow-lg shadow-[#b0ceb4]/10 hover:shadow-[#b0ceb4]/20 transition-all active:scale-95 group/main";
        }
        if (variant === 'outline') {
            return "px-6 py-2 rounded-full border border-outline-variant/20 text-[11px] font-headline font-bold text-outline hover:text-primary hover:border-primary/40 transition-all";
        }
        return "";
    }
</script>

<button class={getClasses()} {onclick}>
    {#if variant === 'primary'}
        <span class="text-[12px] font-headline font-bold uppercase tracking-[0.4em] text-[#1c3624]">{text}</span>
    {:else}
        {text}
    {/if}
</button>
