<script lang="ts">
    interface Props {
        onclick?: () => void;
        class?: string;
        children?: any;
    }

    let { onclick, class: className = "", children }: Props = $props();
</script>

<button
    {onclick}
    class="flex items-center border-1 rounded-md py-2 px-4 border-stone-400 font-mono shadow-md text-sm font-bold gap-2 text-stone-600 hover:bg-neutral-50 hover:cursor-pointer hover:scale-101 {className}"
>
    {@render children?.()}
</button>
