<script lang="ts">
    import type { Snippet } from 'svelte';

    let { 
        show = $bindable(false), 
        children 
    }: {
        show: boolean;
        children?: Snippet;
    } = $props();

    function close(e: MouseEvent) {
        if (e.target === e.currentTarget) show = false;
    }
    
    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') show = false;
    }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if show}
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div 
    class="fixed inset-0 z-50 flex items-center justify-center bg-surface/80 backdrop-blur-md p-4 transition-all"
    onclick={close}
    role="dialog"
    tabindex="-1"
    aria-modal="true"
>
    <div class="bg-surface-container-high rounded-2xl w-full max-w-sm border border-outline-variant/20 p-6 shadow-2xl">
        {@render children?.()}
    </div>
</div>
{/if}
