<script lang="ts">
    import ToolPageTitle from "$lib/components/ToolPageTitle.svelte";
    import StoneTextareaEditable from "$lib/components/StoneTextareaEditable.svelte";
    import StoneTextareaHighlighted from "$lib/components/StoneTextareaHighlighted.svelte";
    import StoneButton from "$lib/components/StoneButton.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import formatJson from "$lib/tools/json-formatter";
    import { useClipboard } from "$lib/composables/useClipboard.svelte";

    const { copyWithToast } = useClipboard();

    const tool = {
        id: 1,
        name: "JSON Formatter",
        slug: "json-formatter",
    };

    let inputJson = $state("");
    let formattedJson = $state("");

    function handleInput() {
        formattedJson = formatJson(inputJson);
    }

    function handleCopy() {
        copyWithToast(formattedJson);
    }
</script>

<svelte:head>
    <title>JSON Formatter - localtoolbox.app</title>
    <meta name="description" content="JSON Formatter/Beautifier" />
</svelte:head>

<main
    class="w-screen mx-auto pt-6 items-center content-center px-1 md:px-8 py-4"
>
    <ToolPageTitle
        title="JSON Formatter"
        description="Format - Beautify JSON"
    />
    <div
        class="mt-6 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>JSON</h2>
                    <StoneButton class="invisible">Empty</StoneButton>
                </div>
                <StoneTextareaEditable
                    bind:value={inputJson}
                    oninput={handleInput}
                    class="min-h-[22rem]"
                    placeholder="Paste your JSON here..."
                />
            </div>
            <div class="w-full flex flex-col gap-2 font-mono">
                <div class="flex justify-between items-end">
                    <h2>Formatted JSON</h2>
                    <StoneButton onclick={handleCopy}>Copy</StoneButton>
                </div>
                <StoneTextareaHighlighted
                    value={formattedJson}
                    class="min-h-[22rem]"
                />
            </div>
        </div>
    </div>

    <!-- Bookmark Button at Bottom -->
    <div class="mt-6 flex justify-center">
        <BookmarkButton {tool} />
    </div>
</main>
