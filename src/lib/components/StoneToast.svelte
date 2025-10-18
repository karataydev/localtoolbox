<script lang="ts">
    import { fly } from "svelte/transition";

    interface Props {
        message?: string;
        show?: boolean;
        duration?: number;
    }

    let {
        message = "",
        show = $bindable(false),
        duration = 3000,
    }: Props = $props();

    $effect(() => {
        if (show) {
            const timer = setTimeout(() => {
                show = false;
            }, duration);

            return () => clearTimeout(timer);
        }
    });
</script>

{#if show}
    <div
        class="fixed top-4 left-1/2 -translate-x-1/2 z-[100]"
        transition:fly={{ y: -20, duration: 300 }}
    >
        <div
            class="flex items-center gap-3 px-4 py-3 rounded-lg border-1 border-stone-400 shadow-md bg-neutral-50 font-mono text-sm text-stone-800"
        >
            <span>{message}</span>
        </div>
    </div>
{/if}
