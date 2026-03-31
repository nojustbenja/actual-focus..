<script lang="ts">
    import "../app.css";
    import { page } from "$app/stores";
    import TopHeader from "$lib/components/layout/TopHeader.svelte";
    import Sidebar from "$lib/components/layout/Sidebar.svelte";
    import RightAside from "$lib/components/layout/RightAside.svelte";
    import { onMount } from "svelte";
    import { initializePersistence } from "$lib/state/persistence.svelte";
    import { requestNotificationPermission } from "$lib/utils/notifications";

    const mobileLinks = [
        { href: "/",          icon: "target",               label: "Focus"     },
    ];

    onMount(() => {
        initializePersistence();
        requestNotificationPermission();
    });
</script>

<div class="layout-container h-screen w-screen grid grid-rows-[80px_1fr] bg-surface-container-lowest
    {$page.url.pathname === '/' 
        ? 'grid-cols-1 md:grid-cols-[80px_1fr] lg:grid-cols-[80px_1fr_340px]' 
        : 'grid-cols-1 md:grid-cols-[80px_1fr]'
    }">
    <TopHeader />
    <Sidebar />
    
    <main class="col-start-1 md:col-start-2 row-start-2 bg-surface flex flex-col relative z-10 overflow-x-hidden overflow-y-auto
        {$page.url.pathname === '/' ? 'rounded-none md:rounded-tl-[2rem] lg:rounded-tr-none lg:rounded-tl-[2rem] md:rounded-tr-[2rem]' : 'rounded-none md:rounded-tl-[2rem] md:rounded-tr-[2rem]'}">
        <slot />
    </main>

    {#if $page.url.pathname === '/'}
        <RightAside />
    {/if}
</div>

<nav class="md:hidden fixed bottom-0 left-0 right-0 bg-[#121412]/90 backdrop-blur-xl flex justify-around items-center px-6 py-4 z-50 border-t border-outline-variant/10">
    {#each mobileLinks as link}
        <a
            href={link.href}
            class="flex flex-col items-center gap-1 transition-colors {$page.url.pathname === link.href ? 'text-primary font-bold' : 'text-moss-dark'}"
        >
            <span class="material-symbols-outlined">{link.icon}</span>
            <span class="text-[8px] font-bold uppercase tracking-tighter">{link.label}</span>
        </a>
    {/each}
</nav>
