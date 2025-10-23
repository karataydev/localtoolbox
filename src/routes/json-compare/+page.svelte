<script lang="ts">
    import ToolPageTitle from "$lib/components/ToolPageTitle.svelte";
    import StoneTextarea from "$lib/components/StoneTextarea.svelte";
    import StoneButton from "$lib/components/StoneButton.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import DiffViewer from "$lib/components/DiffViewer.svelte";
    import { compareJson, type DiffLine } from "$lib/tools/json-diff";

    const tool = {
        id: 5,
        name: "JSON Compare",
        slug: "json-compare",
    };

    let json1 = $state("");
    let json2 = $state("");
    let diffLeft = $state<DiffLine[]>([]);
    let diffRight = $state<DiffLine[]>([]);
    let diffSection: HTMLDivElement | undefined = $state();
    let leftViewer: HTMLDivElement | undefined = $state();
    let rightViewer: HTMLDivElement | undefined = $state();
    let isSyncing = false;

    function handleCompare() {
        const result = compareJson(json1, json2);
        diffLeft = result.leftLines;
        diffRight = result.rightLines;

        // Scroll to diff section after comparison
        setTimeout(() => {
            diffSection?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    }

    function handleLeftScroll(e: Event) {
        if (isSyncing) return;
        isSyncing = true;
        const target = e.target as HTMLElement;
        if (rightViewer) {
            rightViewer.scrollTop = target.scrollTop;
            rightViewer.scrollLeft = target.scrollLeft;
        }
        isSyncing = false;
    }

    function handleRightScroll(e: Event) {
        if (isSyncing) return;
        isSyncing = true;
        const target = e.target as HTMLElement;
        if (leftViewer) {
            leftViewer.scrollTop = target.scrollTop;
            leftViewer.scrollLeft = target.scrollLeft;
        }
        isSyncing = false;
    }
</script>

<svelte:head>
    <title>JSON Compare - localtoolbox.app</title>
    <meta
        name="description"
        content="Compare and find differences between JSON objects"
    />
</svelte:head>

<main
    class="w-screen mx-auto pt-6 items-center content-center px-1 md:px-8 py-4"
>
    <ToolPageTitle
        title="JSON Compare"
        description="Compare two JSON objects and find their differences"
    />

    <!-- Input Section -->
    <div
        class="mt-6 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>JSON 1</h2>
                    <StoneButton class="invisible">Empty</StoneButton>
                </div>
                <StoneTextarea
                    bind:value={json1}
                    class="min-h-[22rem]"
                    placeholder="Paste first JSON here..."
                />
            </div>
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>JSON 2</h2>
                    <StoneButton onclick={handleCompare}>Compare</StoneButton>
                </div>
                <StoneTextarea
                    bind:value={json2}
                    class="min-h-[22rem]"
                    placeholder="Paste second JSON here..."
                />
            </div>
        </div>
    </div>

    <!-- Diff Output Section -->
    {#if diffLeft.length > 0}
        <div
            bind:this={diffSection}
            class="mt-4 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div class="w-full flex flex-col gap-2 font-mono">
                    <div class="flex justify-between items-end">
                        <h2>JSON 1 - Diff</h2>
                    </div>
                    <DiffViewer
                        lines={diffLeft}
                        side="left"
                        class="min-h-[22rem] max-h-[90vh]"
                        bind:containerRef={leftViewer}
                        onscroll={handleLeftScroll}
                    />
                </div>
                <div class="w-full flex flex-col gap-2 font-mono">
                    <div class="flex justify-between items-end">
                        <h2>JSON 2 - Diff</h2>
                    </div>
                    <DiffViewer
                        lines={diffRight}
                        side="right"
                        class="min-h-[22rem] max-h-[90vh]"
                        bind:containerRef={rightViewer}
                        onscroll={handleRightScroll}
                    />
                </div>
            </div>
        </div>
    {/if}

    <!-- Bookmark Button at Bottom -->
    <div class="mt-6 flex justify-center">
        <BookmarkButton {tool} />
    </div>
</main>
