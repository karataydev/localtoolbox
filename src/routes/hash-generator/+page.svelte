<script lang="ts">
    import ToolPageTitle from "$lib/components/ToolPageTitle.svelte";
    import StoneTextarea from "$lib/components/StoneTextarea.svelte";
    import StoneButton from "$lib/components/StoneButton.svelte";
    import StoneSelect from "$lib/components/StoneSelect.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import {
        generateHash,
        type HashAlgorithm,
    } from "$lib/tools/hash-generator";
    import { useClipboard } from "$lib/composables/useClipboard.svelte";

    const { copyWithToast } = useClipboard();

    const tool = {
        id: 7,
        name: "Hash Generator",
        slug: "hash-generator",
    };

    let inputText = $state("");
    let outputHash = $state("");
    let algorithm = $state<HashAlgorithm>("SHA-256");

    function handleInput() {
        outputHash = generateHash(inputText, algorithm);
    }

    function handleCopy() {
        copyWithToast(outputHash);
    }
</script>

<svelte:head>
    <title>Hash Generator - localtoolbox.app</title>
    <meta
        name="description"
        content="Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, SHA-3, and RIPEMD-160 hashes"
    />
</svelte:head>

<main
    class="w-screen mx-auto pt-6 items-center content-center px-1 md:px-8 py-4"
>
    <ToolPageTitle
        title="Hash Generator"
        description="Generate cryptographic hashes using popular algorithms"
    />
    <div
        class="mt-6 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>Input Text</h2>
                    <StoneSelect bind:value={algorithm} onchange={handleInput}>
                        <option value="MD5">MD5</option>
                        <option value="SHA-1">SHA-1</option>
                        <option value="SHA-256">SHA-256</option>
                        <option value="SHA-384">SHA-384</option>
                        <option value="SHA-512">SHA-512</option>
                        <option value="SHA-3">SHA-3</option>
                        <option value="RIPEMD-160">RIPEMD-160</option>
                    </StoneSelect>
                </div>
                <StoneTextarea
                    bind:value={inputText}
                    oninput={handleInput}
                    class="min-h-[22rem]"
                    placeholder="Enter text to hash..."
                />
            </div>
            <div class="w-full flex flex-col gap-2 font-mono">
                <div class="flex justify-between items-end">
                    <h2>Hash Output</h2>
                    <StoneButton onclick={handleCopy}>Copy</StoneButton>
                </div>
                <StoneTextarea
                    bind:value={outputHash}
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
