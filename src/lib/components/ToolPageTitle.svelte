<script lang="ts">
    import logo from "$lib/assets/logo.svg";

    interface Props {
        title?: string;
        description?: string;
    }

    let { title, description }: Props = $props();
</script>

<div class="text-center place-items-center-safe flex flex-col">
    <div class="flex items-center rounded-md p-1">
        <img src={logo} alt="Logo" class="h-16 w-16" />
    </div>
    <h1
        class="font-bold text-3xl pt-1 bg-gradient-to-r from-[#1D2B64] to-[#ad8e97] bg-clip-text text-transparent"
    >
        <span>{title}</span>
    </h1>
    <p class="font-normal text-lg text-stone-400 md:w-2xl pt-2 leading-6">
        {description}
    </p>
</div>
