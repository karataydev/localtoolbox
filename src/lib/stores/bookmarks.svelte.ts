export interface Bookmark {
    id: number;
    name: string;
    slug: string;
}

const STORAGE_KEY = "localtoolbox-bookmarks";

function loadBookmarks(): Bookmark[] {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveBookmarks(bookmarks: Bookmark[]): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (err) {
        console.error("Failed to save bookmarks:", err);
    }
}

let bookmarksState = $state<Bookmark[]>(loadBookmarks());

export function useBookmarks() {
    return {
        get bookmarks() {
            return bookmarksState;
        },
        isBookmarked(slug: string): boolean {
            return bookmarksState.some((b) => b.slug === slug);
        },
        addBookmark(bookmark: Bookmark): void {
            if (!this.isBookmarked(bookmark.slug)) {
                bookmarksState = [...bookmarksState, bookmark];
                saveBookmarks(bookmarksState);
            }
        },
        removeBookmark(slug: string): void {
            bookmarksState = bookmarksState.filter((b) => b.slug !== slug);
            saveBookmarks(bookmarksState);
        },
        toggleBookmark(bookmark: Bookmark): void {
            if (this.isBookmarked(bookmark.slug)) {
                this.removeBookmark(bookmark.slug);
            } else {
                this.addBookmark(bookmark);
            }
        },
    };
}
