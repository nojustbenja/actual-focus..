<script lang="ts">
    import { globalTimer } from "$lib/state/timer.svelte";
    
    function formatTime(date: Date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Live clock for the current time marker
    let now = $state(new Date());
    setInterval(() => { now = new Date(); }, 10000);
    
    function formatNow(date: Date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Derived stats from real sessions
    let totalFocusSeconds = $derived(
        globalTimer.sessions.reduce((acc, s) => {
            return acc + (s.endTime.getTime() - s.startTime.getTime()) / 1000;
        }, 0)
    );

    let focusHours = $derived(
        totalFocusSeconds < 60
            ? `${Math.round(totalFocusSeconds)}s`
            : `${(totalFocusSeconds / 3600).toFixed(1)}h`
    );

    let flowCycles = $derived(globalTimer.sessions.length);

    // Active block time display
    let activeStartLabel = $derived(
        globalTimer.status === 'running' || globalTimer.status === 'paused'
            ? formatNow(now) // approximate; the real start is tracked in the state
            : null
    );
</script>

<aside class="col-start-3 row-start-2 bg-surface-container-lowest z-20 hidden lg:flex flex-col p-6 gap-8 overflow-hidden">
    <div class="flex flex-col gap-1 mt-4 px-2">
        <span class="text-[10px] font-headline uppercase tracking-[0.4em] text-outline font-semibold">Actual Time</span>
        <span class="text-2xl font-headline font-bold text-on-surface">Daily Timeline</span>
    </div>

    <!-- Timeline Content -->
    <div class="flex-1 relative flex overflow-y-auto no-scrollbar py-4">
        <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-surface-container-highest/30"></div>
        <div class="w-full flex flex-col gap-12">

            <!-- Dynamic Past Session Blocks -->
            {#each globalTimer.sessions as session}
            <div class="flex items-center w-full relative group">
                <div class="w-1/2 pr-6 text-right">
                    <div class="bg-surface-container/40 p-4 border-r-2 border-primary/20 rounded-lg opacity-50 hover:opacity-100 transition-opacity cursor-default">
                        <span class="text-[10px] font-headline font-bold uppercase tracking-widest text-outline">{formatTime(session.startTime)} — {formatTime(session.endTime)}</span>
                        <h4 class="text-[11px] font-bold font-headline mt-1 uppercase text-on-surface line-clamp-1 group-hover:line-clamp-none">{session.title}</h4>
                        <p class="text-[9px] text-primary/60 mt-1 uppercase tracking-wider">{session.category}</p>
                    </div>
                </div>
                <div class="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-outline-variant z-10 group-hover:bg-primary transition-colors"></div>
                <div class="w-1/2 pl-6"></div>
            </div>
            {/each}

            <!-- Current Time Marker -->
            <div class="flex items-center w-full relative timeline-current-marker-line h-12">
                <div class="absolute left-1/2 -translate-x-1/2 z-20">
                    <div class="bg-[#FF4C4C] px-5 py-2 rounded-full flex items-center gap-2.5 shadow-xl shadow-[#FF4C4C]/40">
                        <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        <span class="text-[11px] font-headline font-bold text-white whitespace-nowrap tracking-wide">{formatNow(now)}</span>
                    </div>
                </div>
            </div>

            <!-- Active / Rest Block (dynamic) -->
            {#if globalTimer.status === 'running' || globalTimer.status === 'paused'}
            <div class="flex items-center w-full relative group">
                <div class="w-1/2 pr-6"></div>
                <div class="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-surface z-10 flex items-center justify-center">
                    <div class="w-2 h-2 bg-primary animate-ping absolute"></div>
                    <div class="w-2 h-2 bg-primary rounded-full relative"></div>
                </div>
                <div class="w-1/2 pl-6">
                    <div class="bg-primary/10 p-4 border-l-2 border-primary rounded-lg ring-1 ring-primary/20">
                        <span class="text-[10px] font-headline font-bold uppercase tracking-widest text-primary">
                            {globalTimer.status === 'paused' ? 'Paused' : 'In Progress'}
                        </span>
                        <h4 class="text-[11px] font-bold font-headline mt-1 uppercase text-on-surface line-clamp-2">{globalTimer.sessionTitle}</h4>
                        <p class="text-[10px] text-primary/80 mt-1 leading-tight font-medium">{globalTimer.currentCategory.name} · {globalTimer.formattedTime} left</p>
                    </div>
                </div>
            </div>

            {:else if globalTimer.status === 'rest'}
            <div class="flex items-center w-full relative group">
                <div class="w-1/2 pr-6"></div>
                <div class="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-surface z-10 flex items-center justify-center">
                    <div class="w-2 h-2 bg-[#535bf2] animate-ping absolute rounded-full"></div>
                    <div class="w-2 h-2 bg-[#535bf2] rounded-full relative"></div>
                </div>
                <div class="w-1/2 pl-6">
                    <div class="bg-[#535bf2]/10 p-4 border-l-2 border-[#535bf2] rounded-lg ring-1 ring-[#535bf2]/20">
                        <span class="text-[10px] font-headline font-bold uppercase tracking-widest text-[#535bf2]">Rest Phase</span>
                        <h4 class="text-[11px] font-bold font-headline mt-1 uppercase text-on-surface">Recovery Protocol</h4>
                        <p class="text-[10px] text-[#535bf2]/80 mt-1 leading-tight font-medium">{globalTimer.formattedTime} remaining</p>
                    </div>
                </div>
            </div>

            {:else if globalTimer.sessions.length === 0}
            <!-- Empty state — no sessions yet -->
            <div class="flex flex-col items-center gap-3 py-6 opacity-40">
                <span class="material-symbols-outlined text-3xl text-outline">hourglass_empty</span>
                <p class="text-[10px] font-headline uppercase tracking-widest text-outline text-center">Start your first session to log it here</p>
            </div>
            {/if}

        </div>
    </div>

    <!-- Metabolic State Widget -->
    <div class="mt-auto mb-2">
        <div class="bg-surface-container-high/80 rounded-2xl p-5 border border-outline-variant/10 backdrop-blur-sm">
            <div class="flex justify-between items-center mb-4">
                <span class="text-[10px] font-headline uppercase font-bold tracking-[0.2em] text-outline">Metabolic State</span>
                <span class="text-primary text-[9px] font-headline font-bold uppercase px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                    {globalTimer.status === 'rest' ? 'Rest' : globalTimer.status === 'running' ? 'Peak' : 'Idle'}
                </span>
            </div>

            <!-- Compact Smoothed Function -->
            <div class="h-12 relative mb-6">
                <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 60">
                    <path d="M0,50 C20,45 40,20 60,25 S80,55 100,30 S120,5 140,20 S160,50 180,45" fill="none" opacity="0.2" stroke="#b0ceb4" stroke-dasharray="2 2" stroke-width="1.5"></path>
                    <path d="M0,50 C20,45 40,20 60,25 S80,55 100,30 S120,5 140,20" fill="none" stroke="#b0ceb4" stroke-linecap="round" stroke-width="2.5"></path>
                    <circle class="animate-pulse" cx="140" cy="20" fill="#b0ceb4" r="3.5"></circle>
                </svg>
                <div class="absolute -bottom-1 left-0 right-0 flex justify-between text-[8px] font-headline font-bold text-outline/50 uppercase tracking-tighter">
                    <span>06:00</span>
                    <span class="text-primary/70">NOW</span>
                    <span>18:00</span>
                </div>
            </div>

            <!-- Stats Row — computed from real sessions -->
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col">
                    <div class="flex items-center gap-1.5 mb-0.5">
                        <span class="material-symbols-outlined text-primary text-[14px]" style='font-variation-settings: "FILL" 1;'>bolt</span>
                        <span class="text-lg font-headline font-bold text-on-surface leading-none">{focusHours}</span>
                    </div>
                    <span class="text-[9px] font-headline font-bold uppercase text-outline tracking-wider">Focus Earned</span>
                </div>
                <div class="flex flex-col border-l border-outline-variant/10 pl-4">
                    <div class="flex items-center gap-1.5 mb-0.5">
                        <span class="material-symbols-outlined text-primary text-[14px]" style='font-variation-settings: "FILL" 1;'>eco</span>
                        <span class="text-lg font-headline font-bold text-on-surface leading-none">{flowCycles}</span>
                    </div>
                    <span class="text-[9px] font-headline font-bold uppercase text-outline tracking-wider">Flow Cycles</span>
                </div>
            </div>
        </div>
    </div>
</aside>
