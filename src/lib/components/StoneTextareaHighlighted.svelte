<script lang="ts">
    import { highlightJson } from "$lib/tools/json-highlighter";

    interface Props {
        value?: string;
        class?: string;
        rows?: number;
        resize?: "none" | "vertical" | "horizontal" | "both";
    }

    let {
        value = "",
        class: className = "",
        rows = 4,
        resize = "vertical",
    }: Props = $props();

    let highlighted = $derived(highlightJson(value));

    const resizeClass = {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
    };
</script>

<div
    class="flex min-h-20 w-full rounded-lg border border-stone-300 bg-neutral-50 px-3 py-2 text-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-0 overflow-auto {resizeClass[
        resize
    ]} {className}"
>
    <pre
        class="whitespace-pre-wrap break-words w-full m-0">{@html highlighted}</pre>
</div>
