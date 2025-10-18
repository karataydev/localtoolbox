<script lang="ts">
    import Icon from "@iconify/svelte";
    import { useBookmarks } from "$lib/stores/bookmarks.svelte";

    interface Props {
        show: boolean;
        onClose: () => void;
    }

    let { show, onClose }: Props = $props();

    const bookmarks = useBookmarks();

    function navigateToTool(slug: string) {
        window.open(`/${slug}`, "_self");
        onClose();
    }

    function removeBookmark(slug: string, event: MouseEvent) {
        event.stopPropagation();
        bookmarks.removeBookmark(slug);
    }
</script>

{#if show}
    <div
        class="absolute right-4 md:right-8 top-20 border-1 border-stone-300 rounded-lg shadow-lg p-4 w-80 bg-white z-50 max-h-96 overflow-y-auto"
    >
        <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold font-mono text-stone-800">Bookmarked Tools</h3>
            <button
                onclick={onClose}
                class="text-stone-500 hover:text-stone-700 hover:cursor-pointer"
            >
                <Icon icon="mdi:close" width="20" height="20" />
            </button>
        </div>

        {#if bookmarks.bookmarks.length === 0}
            <div class="text-sm text-stone-600 font-mono">
                No bookmarks yet. Bookmark your favorite tools for quick access!
            </div>
        {:else}
            <div class="flex flex-col gap-2">
                {#each bookmarks.bookmarks as bookmark}
                    <div
                        class="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 group"
                    >
                        <button
                            class="flex-1 text-left text-sm font-mono text-stone-800 hover:cursor-pointer"
                            onclick={() => navigateToTool(bookmark.slug)}
                        >
                            {bookmark.name}
                        </button>
                        <button
                            onclick={(e) => removeBookmark(bookmark.slug, e)}
                            class="text-stone-400 hover:text-stone-700 transition-colors ml-2 hover:cursor-pointer"
                            aria-label="Remove bookmark"
                        >
                            <Icon
                                icon="mdi:bookmark-remove"
                                width="18"
                                height="18"
                            />
                        </button>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
{/if}
