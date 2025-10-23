<script lang="ts">
    import ToolPageTitle from "$lib/components/ToolPageTitle.svelte";
    import StoneTextarea from "$lib/components/StoneTextarea.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import { convertTimestamp } from "$lib/tools/timestamp-converter";

    const tool = {
        id: 10,
        name: "Timestamp Converter",
        slug: "timestamp-converter",
    };

    let inputTimestamp = $state("");
    let output = $state("");

    function handleInput() {
        const result = convertTimestamp(inputTimestamp);
        if (result) {
            output = `GMT:\t\t\t${result.gmt}\nYour time zone:\t${result.local}\nRelative:\t\t${result.relative}`;
        } else {
            output = "";
        }
    }
</script>

<svelte:head>
    <title>Timestamp Converter - localtoolbox.app</title>
    <meta
        name="description"
        content="Convert Unix timestamps to human-readable dates"
    />
</svelte:head>

<main
    class="w-screen mx-auto pt-6 items-center content-center px-1 md:px-8 py-4"
>
    <ToolPageTitle
        title="Timestamp Converter"
        description="Convert Unix timestamps to human-readable dates and times"
    />
    <div
        class="mt-6 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>Unix Timestamp</h2>
                </div>
                <StoneTextarea
                    bind:value={inputTimestamp}
                    oninput={handleInput}
                    class="min-h-24"
                    placeholder="Enter Unix timestamp (seconds or milliseconds)..."
                />
            </div>
            <div class="w-full flex flex-col gap-2 font-mono">
                <div class="flex justify-between items-end">
                    <h2>Converted Time</h2>
                </div>
                <StoneTextarea bind:value={output} readonly class="min-h-24" />
            </div>
        </div>
    </div>

    <!-- Bookmark Button at Bottom -->
    <div class="mt-6 flex justify-center">
        <BookmarkButton {tool} />
    </div>
</main>
