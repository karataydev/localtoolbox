<script lang="ts">
    import { tools } from "$lib/data/tools";
    import StoneCard from "$lib/components/StoneCard.svelte";
    import SearchBar from "$lib/components/SearchBar.svelte";
    import logo from "$lib/assets/logo.svg";
</script>

<svelte:head>
    <title>My Tools Collection</title>
    <meta name="description" content="A collection of useful web tools" />
</svelte:head>

<main class="container mx-auto pt-6 items-center content-center px-2 md:px-0">
    <div class="text-center place-items-center-safe flex flex-col">
        <div class="flex items-center rounded-md p-1">
            <img src={logo} alt="Logo" class="h-16 w-16" />
        </div>
        <h1
            class="font-bold text-3xl pt-1 bg-gradient-to-r from-[#1D2B64] to-[#ad8e97] bg-clip-text text-transparent"
        >
            <span>LocalToolBox</span>
        </h1>
        <p class="font-normal text-lg text-stone-400 md:w-2xl pt-2 leading-6">
            Privacy-first, open-source developer tools that run entirely in your
            browser. Free, fast, and secure, your data never leaves your device.
        </p>
    </div>

    <!-- Search Bar -->
    <div class="mt-8 px-4">
        <SearchBar {tools} />
    </div>

    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 max-w-6xl mx-auto px-4"
    >
        {#each tools as tool}
            <StoneCard
                class="h-full hover:shadow-lg transition-shadow md:min-h-40"
                title={tool.name}
                onClick={() => open(tool.slug, "_self")}
                content={tool.description}
            >
                {#if tool.tags}
                    <div class="flex flex-wrap gap-1 mt-auto pt-3 w-full">
                        {#each tool.tags as tag}
                            <span
                                class="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded font-mono"
                            >
                                {tag}
                            </span>
                        {/each}
                    </div>
                {/if}
            </StoneCard>
        {/each}
    </div>
</main>
