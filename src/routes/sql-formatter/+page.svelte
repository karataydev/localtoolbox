<script lang="ts">
    import ToolPageTitle from "$lib/components/ToolPageTitle.svelte";
    import StoneTextarea from "$lib/components/StoneTextarea.svelte";
    import StoneButton from "$lib/components/StoneButton.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import formatSql from "$lib/tools/sql-formatter";
    import { useClipboard } from "$lib/composables/useClipboard.svelte";

    const { copyWithToast } = useClipboard();

    const tool = {
        id: 8,
        name: "SQL Formatter",
        slug: "sql-formatter",
    };

    let inputSql = $state("");
    let formattedSql = $state("");

    function handleInput() {
        formattedSql = formatSql(inputSql);
    }

    function handleCopy() {
        copyWithToast(formattedSql);
    }
</script>

<svelte:head>
    <title>SQL Formatter - localtoolbox.app</title>
    <meta name="description" content="Format and beautify SQL queries" />
</svelte:head>

<main
    class="w-screen mx-auto pt-6 items-center content-center px-1 md:px-8 py-4"
>
    <ToolPageTitle
        title="SQL Formatter"
        description="Format and beautify SQL queries"
    />
    <div
        class="mt-6 flex items-center rounded-md border-stone-400 font-mono p-2 *:text-stone-600"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div class="w-full flex flex-col min-h-16 gap-2">
                <div class="flex justify-between items-end">
                    <h2>Input SQL</h2>
                    <StoneButton class="invisible">Empty</StoneButton>
                </div>
                <StoneTextarea
                    bind:value={inputSql}
                    oninput={handleInput}
                    class="min-h-[22rem]"
                    placeholder="Paste your SQL query here..."
                />
            </div>
            <div class="w-full flex flex-col gap-2 font-mono">
                <div class="flex justify-between items-end">
                    <h2>Formatted SQL</h2>
                    <StoneButton onclick={handleCopy}>Copy</StoneButton>
                </div>
                <StoneTextarea
                    bind:value={formattedSql}
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
