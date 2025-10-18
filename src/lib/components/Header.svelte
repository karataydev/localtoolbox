<script lang="ts">
    import logo from "$lib/assets/logo.svg";
    import Icon from "@iconify/svelte";
    import StoneButton from "./StoneButton.svelte";
    import Bookmarks from "./Bookmarks.svelte";

    let showBookmarks = $state(false);

    function toggleBookmarks() {
        showBookmarks = !showBookmarks;
    }
</script>

<header class="">
    <nav class="w-screen mx-auto px-1 md:px-8 py-4">
        <div class="flex items-center justify-between">
            <!-- Logo -->
            <a
                href="/"
                class="flex items-center gap-2 text-xl font-extrabold font-mono tracking-tight"
            >
                <img src={logo} alt="Logo" class="h-10 w-10" />
                <span
                    class="pt-2 bg-gradient-to-r from-[#6c4e57] to-neutral-800 bg-clip-text text-transparent"
                    >localtoolbox.app</span
                >
            </a>
            <div class="flex gap-3">
                <!-- Bookmarks Button -->
                <StoneButton
                    onclick={toggleBookmarks}
                    class={showBookmarks ? "bg-neutral-100" : ""}
                >
                    <span class="hidden md:flex">Bookmarks</span>
                    <Icon icon="mdi:bookmark" width="20" height="20" />
                </StoneButton>

                <!-- Contribute Button -->
                <StoneButton
                    onclick={() =>
                        open("https://github.com/karataydev/localtoolbox")}
                >
                    <span class="hidden md:flex">Contribute</span>
                    <Icon icon="mdi:github" width="20" height="20" />
                </StoneButton>
            </div>
        </div>
    </nav>

    <Bookmarks show={showBookmarks} onClose={toggleBookmarks} />
</header>
