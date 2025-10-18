<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title?: string;
        onClick?: () => void;
        content?: string;
        class?: string;
        children?: Snippet;
        titleSlot?: Snippet;
        contentSlot?: Snippet;
    }

    let {
        title,
        content,
        class: className = "",
        children,
        titleSlot,
        contentSlot,
        onClick,
    }: Props = $props();
</script>

<button
    onclick={onClick}
    class="border-1 border-stone-300 rounded-lg shadow-md p-4 bg-white hover:scale-102 hover:cursor-pointer hover:bg-neutral-50 transition-transform flex flex-col items-start text-left w-full {className}"
>
    {#if titleSlot}
        {@render titleSlot()}
    {:else if title}
        <h3 class="font-bold text-stone-800 mb-2 text-center w-full">
            {title}
        </h3>
    {/if}

    {#if contentSlot}
        {@render contentSlot()}
    {:else if content}
        <p class="text-sm text-stone-600 text-justify">
            {content}
        </p>
    {/if}

    {#if children}
        {@render children()}
    {/if}
</button>
