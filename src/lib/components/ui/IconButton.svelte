<script lang="ts">
    import NavTooltip from "../NavTooltip.svelte";

    let { 
        icon, 
        tooltip = null, 
        active = false,
        variant = 'sidebar', // sidebar, header, controls, controls-danger
        onclick = undefined
    }: {
        icon: string;
        tooltip?: string | null;
        active?: boolean;
        variant?: 'sidebar' | 'header' | 'controls' | 'controls-danger';
        onclick?: ((event: MouseEvent) => void) | undefined | null;
    } = $props();

    function getClasses() {
        if (variant === 'sidebar' && !active) {
            return "flex items-center justify-center w-12 h-12 text-moss-dark hover:text-[#b0ceb4] hover:bg-surface-container rounded-full transition-all";
        }
        if (variant === 'sidebar' && active) {
            return "flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full transition-all duration-300";
        }
        if (variant === 'header') {
            return "w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-primary";
        }
        if (variant === 'controls' || variant === 'controls-danger') {
            return "w-14 h-14 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container transition-all border border-outline-variant/20 group/btn";
        }
        return "flex items-center justify-center w-12 h-12 text-on-surface hover:bg-surface-container rounded-full transition-all";
    }

    function getIconClasses() {
        if (variant === 'controls') {
            return "text-[24px] text-on-surface/70 group-hover/btn:text-primary transition-colors";
        }
        if (variant === 'controls-danger') {
            return "text-[24px] text-on-surface/70 group-hover/btn:text-error transition-colors";
        }
        return "text-[20px]";
    }
</script>

<div class={tooltip ? "relative group nav-item" : ""}>
    <button class={getClasses()} {onclick}>
        <span class="material-symbols-outlined {getIconClasses()}">
            {icon}
        </span>
    </button>
    {#if tooltip}
        <NavTooltip text={tooltip} />
    {/if}
</div>
