<script lang="ts">
    import favicon from "$lib/assets/logo.svg";
    import "../app.css";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import ToastContainer from "$lib/components/ToastContainer.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen">
    <ToastContainer />
    <Header />

    <main class="flex-1">
        {@render children?.()}
    </main>

    <Footer />
</div>
