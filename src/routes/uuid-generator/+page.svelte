<script lang="ts">
    import ToolPageTitle from "$lib/components/ToolPageTitle.svelte";
    import StoneTextarea from "$lib/components/StoneTextarea.svelte";
    import StoneButton from "$lib/components/StoneButton.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import { generateUUID } from "$lib/tools/uuid-generator";
    import { useClipboard } from "$lib/composables/useClipboard.svelte";

    const { copyWithToast } = useClipboard();

    const tool = {
        id: 9,
        name: "UUID Generator",
        slug: "uuid-generator",
    };

    let outputUUID = $state(generateUUID());

    function handleGenerate() {
        outputUUID = generateUUID();
    }

    function handleCopy() {
        copyWithToast(outputUUID);
    }
</script>

<svelte:head>
    <title>UUID Generator - localtoolbox.app</title>
    <meta
        name="description"
        content="Generate random UUIDs (v4) for development"
    />
</svelte:head>

<main
    class="w-screen mx-auto pt-6 items-center content-center px-1 md:px-8 py-4"
>
    <ToolPageTitle
        title="UUID Generator"
        description="Generate random UUIDs for development and testing"
    />
    <div
        class="mt-6 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
    >
        <div class="w-full md:w-1/2 mx-auto flex flex-col gap-4">
            <div class="flex justify-between items-end">
                <h2>Generated UUID</h2>
                <div class="flex items-center gap-2">
                    <StoneButton onclick={handleGenerate}>Generate</StoneButton>
                    <StoneButton onclick={handleCopy}>Copy</StoneButton>
                </div>
            </div>
            <StoneTextarea
                bind:value={outputUUID}
                readonly
                class="min-h-16"
                placeholder="Click 'Generate' to create a UUID..."
            />
        </div>
    </div>

    <!-- Bookmark Button at Bottom -->
    <div class="mt-6 flex justify-center">
        <BookmarkButton {tool} />
    </div>
</main>
