<script lang="ts">
    interface Props {
        value?: string;
        placeholder?: string;
        class?: string;
        rows?: number;
        disabled?: boolean;
        readonly?: boolean;
        resize?: "none" | "vertical" | "horizontal" | "both";
        oninput?: (e: Event) => void;
        onchange?: (e: Event) => void;
    }

    let {
        value = $bindable(""),
        placeholder = "",
        class: className = "",
        rows = 4,
        disabled = false,
        readonly = false,
        resize = "vertical",
        oninput,
        onchange,
    }: Props = $props();

    const resizeClass = {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
    };
</script>

<textarea
    bind:value
    {placeholder}
    {rows}
    {disabled}
    {readonly}
    {oninput}
    {onchange}
    class="flex min-h-20 w-full rounded-lg border border-stone-300 bg-neutral-50 px-3 py-2 text-sm font-mono placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 {resizeClass[
        resize
    ]} {className}"
></textarea>
