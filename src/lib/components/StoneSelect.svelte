<script lang="ts">
    interface Props {
        value?: string;
        onchange?: (e: Event) => void;
        class?: string;
        children?: any;
    }

    let { value = $bindable(""), onchange, class: className = "", children }: Props = $props();
</script>

<div class="relative inline-block">
    <select
        bind:value
        {onchange}
        class="appearance-none border-1 rounded-md py-2 pl-4 pr-8 border-stone-400 font-mono shadow-md text-sm font-bold text-stone-600 bg-white hover:bg-neutral-50 cursor-pointer {className}"
    >
        {@render children?.()}
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-stone-600">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    </div>
</div>
