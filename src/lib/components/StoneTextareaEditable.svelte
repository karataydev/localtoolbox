<script lang="ts">
    import { highlightJson } from "$lib/tools/json-highlighter";

    interface Props {
        value?: string;
        placeholder?: string;
        class?: string;
        rows?: number;
        resize?: "none" | "vertical" | "horizontal" | "both";
        oninput?: (e: Event) => void;
    }

    let {
        value = $bindable(""),
        placeholder = "",
        class: className = "",
        rows = 4,
        resize = "vertical",
        oninput,
    }: Props = $props();

    let textarea: HTMLTextAreaElement;
    let highlightedDiv: HTMLDivElement;
    let highlighted = $derived(highlightJson(value));

    const resizeClass = {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
    };

    function handleScroll() {
        if (highlightedDiv && textarea) {
            highlightedDiv.scrollTop = textarea.scrollTop;
            highlightedDiv.scrollLeft = textarea.scrollLeft;
        }
    }
</script>

<div class="relative {className}">
    <!-- Highlighted background -->
    <div
        bind:this={highlightedDiv}
        class="absolute inset-0 w-full h-full rounded-lg border border-stone-300 bg-neutral-50 px-3 py-2 text-sm font-mono overflow-auto pointer-events-none {resizeClass[resize]}"
        style="min-height: {rows * 1.5}rem;"
    >
        <pre class="whitespace-pre-wrap break-words w-full m-0">{@html highlighted || ' '}</pre>
    </div>

    <!-- Textarea overlay (transparent text) -->
    <textarea
        bind:this={textarea}
        bind:value
        {placeholder}
        {rows}
        {oninput}
        onscroll={handleScroll}
        class="relative w-full rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm font-mono text-transparent caret-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-0 placeholder:text-stone-400 {resizeClass[resize]}"
        style="min-height: {rows * 1.5}rem;"
    ></textarea>
</div>
