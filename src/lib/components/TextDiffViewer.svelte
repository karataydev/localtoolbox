<script lang="ts">
    import type { TextChange } from "$lib/tools/text-diff";

    interface Props {
        changes: TextChange[];
        side: "left" | "right";
        class?: string;
        onscroll?: (e: Event) => void;
        containerRef?: HTMLDivElement;
    }

    let {
        changes,
        side,
        class: className = "",
        onscroll,
        containerRef = $bindable(),
    }: Props = $props();

    function getBackgroundClass(type: string, side: string): string {
        if (type === "unchanged") return "";
        if (type === "added") return "bg-fuchsia-100";
        if (type === "removed") return "bg-blue-100";
        return "";
    }
</script>

<div
    bind:this={containerRef}
    {onscroll}
    class="flex min-h-20 w-full rounded-lg border border-stone-300 bg-neutral-50 px-3 py-2 text-sm font-mono overflow-auto resize-y {className}"
>
    <pre class="w-full whitespace-pre-wrap break-words">{#each changes as change}<span
                class="{getBackgroundClass(
                    change.type,
                    side,
                )}">{change.value}</span>{/each}</pre>
</div>
