<script lang="ts">
    import favicon from "$lib/assets/logo.svg";
    import "../app.css";
    import Header from "$lib/components/Header.svelte";
    import ToastContainer from "$lib/components/ToastContainer.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<ToastContainer />
<Header />
{@render children?.()}
