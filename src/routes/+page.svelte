<script lang="ts">
    import Button from "$lib/components/ui/Button.svelte";
    import IconButton from "$lib/components/ui/IconButton.svelte";
    import Modal from "$lib/components/ui/Modal.svelte";
    import { globalTimer } from "$lib/state/timer.svelte";
    import { onMount } from "svelte";
    import { exportToJson, exportToCsv, downloadFile } from "$lib/utils/persistence";

    let showCategoryModal = $state(false);
    let showTimeModal = $state(false);
    let showSettingsModal = $state(false);
    let newCategory = $state('');
    let timeInputMinutes = $state(45);
    
    let workMinutes = $state(45);
    let shortBreakMinutes = $state(5);
    let longBreakMinutes = $state(15);

    function handleKeydown(e: KeyboardEvent) {
        if (e.target instanceof HTMLInputElement) return;
        
        if (e.code === 'Space') {
            e.preventDefault();
            globalTimer.toggle();
        } else if (e.key === 'r' || e.key === 'R') {
            globalTimer.reset();
        } else if (e.key === '+' || e.key === '=') {
            globalTimer.addTime(300);
        } else if (e.key === '-' || e.key === '_') {
            globalTimer.subTime(300);
        } else if (e.key === 'Escape') {
            globalTimer.stop();
        }
    }

    function openSettings() {
        workMinutes = Math.floor(globalTimer.totalTime / 60);
        shortBreakMinutes = 5;
        longBreakMinutes = 15;
        showSettingsModal = true;
    }

    function applyIntervals() {
        globalTimer.setIntervals({
            work: workMinutes * 60,
            shortBreak: shortBreakMinutes * 60,
            longBreak: longBreakMinutes * 60
        });
        showSettingsModal = false;
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="flex-1 flex flex-col items-center justify-center px-8 pb-24 md:pb-12 relative min-h-full overflow-hidden">
    <div class="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <div class="border-[1px] border-primary rounded-full ease-in-out duration-[2000ms] transition-all {globalTimer.status === 'running' ? 'w-[1200px] h-[1200px] animate-pulse-slow' : 'w-[450px] h-[450px]'}"></div>
    </div>
    
    <div class="relative w-full max-w-2xl flex flex-col items-center gap-8 my-auto pt-10 lg:pt-0">
        <div class="w-full text-center flex flex-col items-center gap-4">
            <span class="text-[10px] font-headline uppercase tracking-[0.4em] text-outline/60 font-medium">
                {globalTimer.status === 'rest' ? 'Rest Phase Activated' : 'Current Objective'}
            </span>
            <div class="flex flex-col items-center w-full max-w-lg z-20">
                <input 
                    type="text" 
                    bind:value={globalTimer.sessionTitle} 
                    class="text-2xl md:text-3xl font-headline font-bold text-on-surface uppercase tracking-wider text-center bg-transparent border-none outline-none w-full focus:ring-0 focus:border-b-2 focus:border-primary/50 transition-all px-2 py-1 placeholder:text-surface-bright appearance-none shadow-none"
                    placeholder="Enter Objective..."
                    disabled={globalTimer.status !== 'idle'}
                />
            </div>
        </div>

        <div class="flex flex-col items-center gap-10">
            <button 
                class="px-5 py-2 bg-primary/10 border border-primary/20 rounded-full hover:bg-primary/20 transition-colors cursor-pointer z-20 flex items-center gap-2"
                onclick={() => showCategoryModal = true}
            >
                <span class="material-symbols-outlined text-[14px] text-primary">{globalTimer.currentCategory.icon}</span>
                <span class="text-[12px] font-headline font-bold uppercase tracking-[0.3em] text-primary">{globalTimer.currentCategory.name}</span>
            </button>

            <div class="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[320px]">
                <svg viewBox="0 0 320 320" class="w-full h-auto transform -rotate-90">
                    <circle class="text-surface-container" cx="160" cy="160" fill="transparent" r="150" stroke="currentColor" stroke-width="2"></circle>
                    <circle class="{globalTimer.status === 'rest' ? 'text-[#535bf2]' : 'text-primary'} transition-all duration-1000" cx="160" cy="160" fill="transparent" r="150" stroke="currentColor" stroke-dasharray="942" stroke-dashoffset={globalTimer.dashOffset} stroke-linecap="round" stroke-width="8"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <button 
                        class="text-5xl sm:text-6xl md:text-7xl font-headline font-bold tracking-tighter text-on-surface hover:text-primary transition-colors disabled:hover:text-on-surface cursor-pointer disabled:cursor-default"
                        onclick={() => {
                            if (globalTimer.status === 'idle') {
                                timeInputMinutes = Math.floor(globalTimer.totalTime / 60);
                                showTimeModal = true;
                            }
                        }}
                        disabled={globalTimer.status !== 'idle'}
                    >
                        {globalTimer.formattedTime}
                    </button>
                </div>
                <div class="absolute -inset-8 bg-primary/5 rounded-full blur-3xl opacity-40"></div>
            </div>

            <div class="flex flex-col items-center gap-8 w-full z-20">
                <div class="flex items-center justify-center gap-4 sm:gap-8">
                    <IconButton icon="refresh" variant="controls" onclick={() => globalTimer.reset()} />
                    <Button 
                        text={globalTimer.status === 'rest' ? 'End Rest' : globalTimer.status === 'running' ? 'Pause Focus' : 'Engage Focus'} 
                        variant="primary" 
                        onclick={() => globalTimer.toggle()} 
                    />
                    <IconButton icon="stop" variant="controls-danger" onclick={() => globalTimer.stop()} />
                </div>

                <div class="flex items-center gap-6">
                    <Button text="-5M" variant="outline" onclick={() => globalTimer.subTime(300)} />
                    <Button text="+5M" variant="outline" onclick={() => globalTimer.addTime(300)} />
                    <Button text="Settings" variant="outline" onclick={openSettings} />
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Category Modal -->
<Modal bind:show={showCategoryModal}>
    <h3 class="text-xl font-headline font-bold mb-4 text-on-surface">Categories</h3>
    <div class="flex flex-col gap-2 mb-6 max-h-48 overflow-y-auto no-scrollbar">
        {#each globalTimer.categories as cat}
            <div class="flex items-center gap-2">
                <button 
                    class="flex-1 flex items-center gap-3 text-left px-4 py-3 rounded-xl border {globalTimer.currentCategory.name === cat.name ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-container border-outline-variant/10 text-on-surface hover:bg-surface-container-highest'} transition-colors font-body text-sm cursor-pointer"
                    onclick={() => { globalTimer.setCategory(cat.name); showCategoryModal = false; }}
                >
                    <span class="material-symbols-outlined text-[18px] opacity-70">{cat.icon}</span>
                    {cat.name}
                </button>
                {#if globalTimer.categories.length > 1}
                <button 
                    class="w-10 h-10 flex items-center justify-center text-outline hover:text-error hover:bg-error/10 rounded-xl transition-colors cursor-pointer"
                    onclick={() => globalTimer.removeCategory(cat.name)}
                    aria-label="Delete Category"
                >
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
                {/if}
            </div>
        {/each}
    </div>
    <div class="mt-auto border-t border-outline-variant/10 pt-4 flex gap-2">
        <input 
            type="text" 
            bind:value={newCategory} 
            placeholder="New Category..." 
            class="flex-1 bg-surface-container rounded-lg border border-outline-variant/20 px-3 py-2 text-sm text-on-surface font-body outline-none focus:border-primary/50"
            onkeydown={(e) => {
                if (e.key === 'Enter' && newCategory.trim()) {
                    globalTimer.addCategory(newCategory);
                    newCategory = '';
                }
            }}
        />
        <button 
            class="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold font-headline tracking-wider uppercase hover:bg-primary-fixed transition-colors cursor-pointer"
            onclick={() => { 
                if (newCategory.trim()) {
                    globalTimer.addCategory(newCategory);
                    newCategory = '';
                }
            }}
        >
            Add
        </button>
    </div>
</Modal>

<!-- Time Modal -->
<Modal bind:show={showTimeModal}>
    <h3 class="text-xl font-headline font-bold mb-4 text-on-surface">Set Focus Time</h3>
    <div class="flex flex-col gap-4 mb-6">
        <label class="flex flex-col gap-2">
            <span class="text-xs font-headline uppercase tracking-widest text-outline">Minutes</span>
            <input 
                type="number" 
                bind:value={timeInputMinutes} 
                min="1" max="180"
                class="bg-surface-container rounded-lg border border-outline-variant/20 px-4 py-3 text-lg text-on-surface font-headline font-bold outline-none focus:border-primary/50"
                onkeydown={(e) => {
                    if (e.key === 'Enter') {
                        globalTimer.setTotalTime(timeInputMinutes * 60); 
                        showTimeModal = false;
                    }
                }}
            />
        </label>
    </div>
    <div class="flex justify-end gap-3">
        <button 
            class="px-6 py-2 rounded-full border border-outline-variant/20 text-xs font-headline font-bold text-outline hover:text-on-surface transition-colors cursor-pointer"
            onclick={() => showTimeModal = false}
        >
            Cancel
        </button>
        <button 
            class="px-6 py-2 bg-primary text-on-primary rounded-full text-xs font-bold font-headline uppercase tracking-wider hover:bg-primary-fixed transition-colors shadow-lg shadow-primary/10 cursor-pointer"
            onclick={() => { 
                globalTimer.setTotalTime(timeInputMinutes * 60); 
                showTimeModal = false; 
            }}
        >
            Apply
        </button>
    </div>
</Modal>

<!-- Settings Modal -->
<Modal bind:show={showSettingsModal}>
    <h3 class="text-xl font-headline font-bold mb-4 text-on-surface">Pomodoro Intervals</h3>
    <div class="flex flex-col gap-4 mb-6">
        <label class="flex flex-col gap-2">
            <span class="text-xs font-headline uppercase tracking-widest text-outline">Work Duration (min)</span>
            <input 
                type="number" 
                bind:value={workMinutes} 
                min="1" max="180"
                class="bg-surface-container rounded-lg border border-outline-variant/20 px-4 py-3 text-lg text-on-surface font-headline font-bold outline-none focus:border-primary/50"
            />
        </label>
        <label class="flex flex-col gap-2">
            <span class="text-xs font-headline uppercase tracking-widest text-outline">Short Break (min)</span>
            <input 
                type="number" 
                bind:value={shortBreakMinutes} 
                min="1" max="30"
                class="bg-surface-container rounded-lg border border-outline-variant/20 px-4 py-3 text-lg text-on-surface font-headline font-bold outline-none focus:border-primary/50"
            />
        </label>
        <label class="flex flex-col gap-2">
            <span class="text-xs font-headline uppercase tracking-widest text-outline">Long Break (min)</span>
            <input 
                type="number" 
                bind:value={longBreakMinutes} 
                min="1" max="60"
                class="bg-surface-container rounded-lg border border-outline-variant/20 px-4 py-3 text-lg text-on-surface font-headline font-bold outline-none focus:border-primary/50"
            />
        </label>
    </div>
    <div class="flex justify-end gap-3">
        <button 
            class="px-6 py-2 rounded-full border border-outline-variant/20 text-xs font-headline font-bold text-outline hover:text-on-surface transition-colors cursor-pointer"
            onclick={() => showSettingsModal = false}
        >
            Cancel
        </button>
        <button 
            class="px-6 py-2 bg-primary text-on-primary rounded-full text-xs font-bold font-headline uppercase tracking-wider hover:bg-primary-fixed transition-colors shadow-lg shadow-primary/10 cursor-pointer"
            onclick={applyIntervals}
        >
            Apply
        </button>
    </div>
    <div class="mt-4 pt-4 border-t border-outline-variant/10">
        <span class="text-[10px] font-headline uppercase tracking-widest text-outline">Export Data</span>
        <div class="flex gap-2 mt-2">
            <button 
                class="flex-1 px-4 py-2 rounded-lg border border-outline-variant/20 text-xs font-headline font-bold text-outline hover:text-on-surface hover:border-primary/30 transition-colors cursor-pointer"
                onclick={() => {
                    const data = globalTimer.sessions.map(s => ({
                        title: s.title,
                        category: s.category,
                        start_time: s.startTime.toISOString(),
                        end_time: s.endTime.toISOString()
                    }));
                    downloadFile(exportToJson(data), 'focus-sessions.json', 'application/json');
                }}
            >
                JSON
            </button>
            <button 
                class="flex-1 px-4 py-2 rounded-lg border border-outline-variant/20 text-xs font-headline font-bold text-outline hover:text-on-surface hover:border-primary/30 transition-colors cursor-pointer"
                onclick={() => {
                    const data = globalTimer.sessions.map(s => ({
                        title: s.title,
                        category: s.category,
                        start_time: s.startTime.toISOString(),
                        end_time: s.endTime.toISOString()
                    }));
                    downloadFile(exportToCsv(data), 'focus-sessions.csv', 'text/csv');
                }}
            >
                CSV
            </button>
        </div>
    </div>
</Modal>
