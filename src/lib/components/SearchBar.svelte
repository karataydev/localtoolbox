<script lang="ts">
    import type { Tool } from "$lib/types/tool";
    import Icon from "@iconify/svelte";

    interface Props {
        tools: Tool[];
    }

    let { tools }: Props = $props();

    let searchQuery = $state("");
    let searchResults = $state<Tool[]>([]);
    let showResults = $state(false);
    let searchContainer: HTMLDivElement;

    function handleClickOutside(event: MouseEvent) {
        if (
            searchContainer &&
            !searchContainer.contains(event.target as Node)
        ) {
            showResults = false;
        }
    }

    $effect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    function searchTools() {
        if (searchQuery.trim() === "") {
            searchResults = [];
            showResults = false;
            return;
        }

        const query = searchQuery.toLowerCase();

        // Search and rank results
        const results = tools
            .map((tool) => {
                let score = 0;

                // Priority 1: Title match
                if (tool.name.toLowerCase().includes(query)) {
                    score += 10;
                }

                // Priority 2: Description match
                if (tool.description.toLowerCase().includes(query)) {
                    score += 5;
                }

                // Priority 3: Tags match
                if (
                    tool.tags?.some((tag) => tag.toLowerCase().includes(query))
                ) {
                    score += 3;
                }

                return { tool, score };
            })
            .filter((result) => result.score > 0)
            .sort((a, b) => b.score - a.score)
            .map((result) => result.tool);

        searchResults = results;
        showResults = true;
    }

    function selectTool(slug: string) {
        window.open(`${slug}`, "_self");
        searchQuery = "";
        showResults = false;
    }

    function handleInput() {
        searchTools();
    }
</script>

<div class="w-full max-w-2xl mx-auto relative" bind:this={searchContainer}>
    <!-- Search Input -->
    <div class="relative">
        <input
            type="text"
            bind:value={searchQuery}
            oninput={handleInput}
            onfocus={() => searchQuery && (showResults = true)}
            placeholder="Search tools..."
            class="w-full px-4 py-3 pl-12 pr-12 border-1 border-stone-400 rounded-lg shadow-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
        />
        <Icon
            icon="mdi:magnify"
            width="20"
            height="20"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
        />
        {#if searchQuery}
            <button
                onclick={() => {
                    searchQuery = "";
                    showResults = false;
                }}
                class="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
                <Icon icon="mdi:close" width="20" height="20" />
            </button>
        {/if}
    </div>

    <!-- Search Results -->
    {#if showResults && searchResults.length > 0}
        <div
            class="absolute top-full mt-2 w-full border-1 border-stone-300 rounded-lg shadow-lg bg-white z-50 max-h-72 overflow-y-auto"
        >
            {#each searchResults as tool}
                <button
                    onclick={() => selectTool(tool.slug)}
                    class="w-full px-4 py-3 hover:bg-neutral-100 hover:cursor-pointer last:border-b-0 text-left transition-colors"
                >
                    <div class="flex items-center gap-2 min-w-0">
                        <h4
                            class="text-stone-800 text-sm font-semibold shrink-0"
                        >
                            {tool.name}
                        </h4>
                        <span class="text-stone-400 text-xs">—</span>
                        <p class="text-stone-400 text-xs truncate min-w-0">
                            {tool.description}
                        </p>
                    </div>
                </button>
            {/each}
        </div>
    {/if}

    {#if showResults && searchQuery && searchResults.length === 0}
        <div
            class="absolute top-full mt-2 w-full border-1 border-stone-300 rounded-lg shadow-lg bg-white z-50 px-4 py-6 text-center"
        >
            <Icon
                icon="mdi:magnify-close"
                width="32"
                height="32"
                class="mx-auto text-stone-400 mb-2"
            />
            <p class="text-sm text-stone-600 font-mono">No tools found</p>
        </div>
    {/if}
</div>
