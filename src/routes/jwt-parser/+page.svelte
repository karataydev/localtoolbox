<script lang="ts">
    import ToolPageTitle from "$lib/components/ToolPageTitle.svelte";
    import StoneTextarea from "$lib/components/StoneTextarea.svelte";
    import StoneButton from "$lib/components/StoneButton.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import { parseJwt } from "$lib/tools/jwt-parser";
    import { useClipboard } from "$lib/composables/useClipboard.svelte";

    const { copyWithToast } = useClipboard();

    const tool = {
        id: 3,
        name: "JWT Parser",
        slug: "jwt-parser",
    };

    let inputJwt = $state("");
    let parsedJwt = $state("");

    function handleInput() {
        parsedJwt = parseJwt(inputJwt);
    }

    function handleCopy() {
        copyWithToast(parsedJwt);
    }
</script>

<svelte:head>
    <title>JWT Parser - localtoolbox.app</title>
    <meta name="description" content="Parse/Decode JWT tokens" />
</svelte:head>

<main
    class="w-screen mx-auto pt-6 items-center content-center px-1 md:px-8 py-4"
>
    <ToolPageTitle
        title="JWT Parser"
        description="Decode JWT tokens and view their header, payload, and signature"
    />
    <div
        class="mt-6 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>JWT Token</h2>
                    <StoneButton class="invisible">Empty</StoneButton>
                </div>
                <StoneTextarea
                    bind:value={inputJwt}
                    oninput={handleInput}
                    class="min-h-[22rem]"
                    placeholder="Paste your JWT token here..."
                />
            </div>
            <div class="w-full flex flex-col gap-2 font-mono">
                <div class="flex justify-between items-end">
                    <h2>Parsed JWT</h2>
                    <StoneButton onclick={handleCopy}>Copy</StoneButton>
                </div>
                <StoneTextarea
                    bind:value={parsedJwt}
                    readonly
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
