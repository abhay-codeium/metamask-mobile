/**
 * Bookmark entry
 */
export interface Bookmark {
  name: string;
  url: string;
}

/**
 * Bookmarks reducer state - array of bookmark entries
 */
export type BookmarksState = Bookmark[];

/**
 * Initial state for bookmarks reducer
 */
export const bookmarksInitialState: BookmarksState = [];
