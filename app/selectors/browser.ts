import { UrlAutocompleteCategory } from '../components/UI/UrlAutocomplete';
import { RootState } from '../reducers';
import { BrowserHistoryEntry } from '../reducers/browser';
import { Bookmark } from '../reducers/bookmarks';
import { createDeepEqualSelector } from './util';

export const selectBrowserHistoryWithType = createDeepEqualSelector(
  (state: RootState) => state.browser.history,
  (history: BrowserHistoryEntry[]) =>
    history
      .map(
        (item) =>
          ({ ...item, category: UrlAutocompleteCategory.Recents } as const),
      )
      .reverse(),
);

export const selectBrowserBookmarksWithType = createDeepEqualSelector(
  (state: RootState) => state.bookmarks,
  (bookmarks: Bookmark[]) =>
    bookmarks.map(
      (item) =>
        ({ ...item, category: UrlAutocompleteCategory.Favorites } as const),
    ),
);
