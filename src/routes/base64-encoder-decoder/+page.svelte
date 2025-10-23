<script lang="ts">
    import ToolPageTitle from "$lib/components/ToolPageTitle.svelte";
    import StoneTextarea from "$lib/components/StoneTextarea.svelte";
    import StoneButton from "$lib/components/StoneButton.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import { encodeBase64, decodeBase64 } from "$lib/tools/base64";
    import { useClipboard } from "$lib/composables/useClipboard.svelte";

    const { copyWithToast } = useClipboard();

    const tool = {
        id: 2,
        name: "Base64 Encoder/Decoder",
        slug: "base64-encoder-decoder",
    };

    let inputText = $state("");
    let outputText = $state("");
    let mode = $state<"encode" | "decode">("encode");

    function handleInput() {
        if (mode === "encode") {
            outputText = encodeBase64(inputText);
        } else {
            outputText = decodeBase64(inputText);
        }
    }

    function toggleMode() {
        mode = mode === "encode" ? "decode" : "encode";
        // Swap input and output
        const temp = inputText;
        inputText = outputText;
        outputText = temp;
    }

    function handleCopy() {
        copyWithToast(outputText);
    }
</script>

<svelte:head>
    <title>Base64 Encoder/Decoder - localtoolbox.app</title>
    <meta name="description" content="Encode and decode Base64 strings" />
</svelte:head>

<main
    class="w-screen mx-auto pt-6 items-center content-center px-1 md:px-8 py-4"
>
    <ToolPageTitle
        title="Base64 Encoder/Decoder"
        description="Encode and decode Base64 strings"
    />
    <div
        class="mt-6 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>{mode === "encode" ? "Text" : "Base64"}</h2>
                    <StoneButton onclick={toggleMode} class="shadow-2xs">
                        {mode === "encode" ? "Decode" : "Encode"}
                    </StoneButton>
                </div>
                <StoneTextarea
                    bind:value={inputText}
                    oninput={handleInput}
                    class="min-h-[22rem]"
                    placeholder={mode === "encode"
                        ? "Enter text to encode..."
                        : "Enter Base64 to decode..."}
                />
            </div>
            <div class="w-full flex flex-col gap-2 font-mono">
                <div class="flex justify-between items-end">
                    <h2>{mode === "encode" ? "Base64" : "Text"}</h2>
                    <StoneButton onclick={handleCopy}>Copy</StoneButton>
                </div>
                <StoneTextarea
                    bind:value={outputText}
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
