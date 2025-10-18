<script lang="ts">
    import Icon from "@iconify/svelte";
    import StoneButton from "./StoneButton.svelte";
    import { useBookmarks, type Bookmark } from "$lib/stores/bookmarks.svelte";

    interface Props {
        tool: Bookmark;
    }

    let { tool }: Props = $props();

    const bookmarks = useBookmarks();

    let isBookmarked = $derived(bookmarks.isBookmarked(tool.slug));

    function toggleBookmark() {
        bookmarks.toggleBookmark(tool);
    }
</script>

<StoneButton onclick={toggleBookmark}>
    <Icon
        icon={isBookmarked ? "mdi:bookmark" : "mdi:bookmark-outline"}
        width="20"
        height="20"
    />
    <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
</StoneButton>
