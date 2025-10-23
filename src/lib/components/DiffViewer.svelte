<script lang="ts">
    import type { DiffLine } from "$lib/tools/json-diff";

    interface Props {
        lines: DiffLine[];
        side: "left" | "right";
        class?: string;
        onscroll?: (e: Event) => void;
        containerRef?: HTMLDivElement;
    }

    let { lines, side, class: className = "", onscroll, containerRef = $bindable() }: Props = $props();

    function getBackgroundClass(type: string, side: string): string {
        if (type === "unchanged") return "";
        if (type === "added") return "bg-fuchsia-100";
        if (type === "removed") return "bg-blue-100";
        if (type === "modified") {
            return side === "left" ? "bg-blue-100" : "bg-fuchsia-100";
        }
        return "";
    }
</script>

<div
    bind:this={containerRef}
    {onscroll}
    class="flex min-h-20 w-full rounded-lg border border-stone-300 bg-neutral-50 px-3 py-2 text-sm font-mono overflow-auto resize-y {className}"
>
    <pre
        class="w-full whitespace-pre-wrap break-words">{#each lines as line}<div
                class="leading-relaxed {getBackgroundClass(
                    line.type,
                    side,
                )}">{line.content || " "}</div>{/each}</pre>
</div>
