<script lang="ts">
    import ToolPageTitle from "$lib/components/ToolPageTitle.svelte";
    import StoneTextarea from "$lib/components/StoneTextarea.svelte";
    import StoneButton from "$lib/components/StoneButton.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import { encodeBase64, decodeBase64 } from "$lib/tools/base64";
    import { useClipboard } from "$lib/composables/useClipboard.svelte";
    import { convertYamlToSpringProperties, convertPropertiesToYaml } from "$lib/tools/yaml-properties";

    const { copyWithToast } = useClipboard();

    const tool = {
        id: 4,
        name: "YAML to Properties",
        slug: "yaml-to-properties",
    };

    let inputText = $state("");
    let outputText = $state("");
    let mode = $state<"toProperties" | "toYAML">("toProperties");

    function handleInput() {
        if (mode === "toProperties") {
            outputText = convertYamlToSpringProperties(inputText);
        } else {
            outputText = convertPropertiesToYaml(inputText);
        }
    }

    function toggleMode() {
        mode = mode === "toProperties" ? "toYAML" : "toProperties";
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
    <title>YAML to Properties - localtoolbox.app</title>
    <meta name="description" content="YAML to Properties" />
</svelte:head>

<main
    class="w-screen mx-auto pt-6 items-center content-center px-1 md:px-8 py-4"
>
    <ToolPageTitle
        title="YAML to Properties"
        description="Convert between YAML and Spring Properties format"
    />
    <div
        class="mt-6 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>{mode === "toProperties" ? "YAML" : "Properties"}</h2>
                    <StoneButton onclick={toggleMode} class="shadow-2xs">
                        {mode === "toProperties" ? "to YAML" : "to Properties"}
                    </StoneButton>
                </div>
                <StoneTextarea
                    bind:value={inputText}
                    oninput={handleInput}
                    class="min-h-[22rem]"
                    placeholder={mode === "toProperties"
                        ? "Enter YAML to convert..."
                        : "Enter Spring Properties to convert..."}
                />
            </div>
            <div class="w-full flex flex-col gap-2 font-mono">
                <div class="flex justify-between items-end">
                    <h2>{mode === "toProperties" ? "Properties" : "YAML"}</h2>
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
