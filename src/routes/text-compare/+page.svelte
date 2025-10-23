<script lang="ts">
    import ToolPageTitle from "$lib/components/ToolPageTitle.svelte";
    import StoneTextarea from "$lib/components/StoneTextarea.svelte";
    import StoneButton from "$lib/components/StoneButton.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import TextDiffViewer from "$lib/components/TextDiffViewer.svelte";
    import { compareText, type TextChange } from "$lib/tools/text-diff";

    const tool = {
        id: 6,
        name: "Text Compare",
        slug: "text-compare",
    };

    let text1 = $state("");
    let text2 = $state("");
    let diffLeft = $state<TextChange[]>([]);
    let diffRight = $state<TextChange[]>([]);
    let diffSection: HTMLDivElement | undefined = $state();
    let leftViewer: HTMLDivElement | undefined = $state();
    let rightViewer: HTMLDivElement | undefined = $state();
    let isSyncing = false;

    function handleCompare() {
        const result = compareText(text1, text2);
        diffLeft = result.leftChanges;
        diffRight = result.rightChanges;

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
    <title>Text Compare - localtoolbox.app</title>
    <meta
        name="description"
        content="Compare two texts and find their differences"
    />
</svelte:head>

<main
    class="w-screen mx-auto pt-6 items-center content-center px-1 md:px-8 py-4"
>
    <ToolPageTitle
        title="Text Compare"
        description="Compare two texts and highlight their differences"
    />

    <!-- Input Section -->
    <div
        class="mt-6 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>Text 1</h2>
                    <StoneButton class="invisible">Empty</StoneButton>
                </div>
                <StoneTextarea
                    bind:value={text1}
                    class="min-h-[22rem]"
                    placeholder="Paste first text here..."
                />
            </div>
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>Text 2</h2>
                    <StoneButton onclick={handleCompare}>Compare</StoneButton>
                </div>
                <StoneTextarea
                    bind:value={text2}
                    class="min-h-[22rem]"
                    placeholder="Paste second text here..."
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
                        <h2>Text 1 - Diff</h2>
                    </div>
                    <TextDiffViewer
                        changes={diffLeft}
                        side="left"
                        class="min-h-[22rem] max-h-[90vh]"
                        bind:containerRef={leftViewer}
                        onscroll={handleLeftScroll}
                    />
                </div>
                <div class="w-full flex flex-col gap-2 font-mono">
                    <div class="flex justify-between items-end">
                        <h2>Text 2 - Diff</h2>
                    </div>
                    <TextDiffViewer
                        changes={diffRight}
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
