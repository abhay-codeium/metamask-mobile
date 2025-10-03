/* eslint-disable @typescript-eslint/default-param-last */

export interface Bookmark {
  url: string;
  name: string;
}

export type BookmarksState = Bookmark[];

interface AddBookmarkAction {
  type: 'ADD_BOOKMARK';
  bookmark: Bookmark;
}

interface RemoveBookmarkAction {
  type: 'REMOVE_BOOKMARK';
  bookmark: Bookmark;
}

type BookmarksAction = AddBookmarkAction | RemoveBookmarkAction;

export const initialState: BookmarksState = [];

const bookmarksReducer = (
  state: BookmarksState = initialState,
  action: BookmarksAction,
): BookmarksState => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return [...state, action.bookmark];
    case 'REMOVE_BOOKMARK':
      return state.filter(
        (bookmark) =>
          !(
            bookmark.url === action.bookmark.url &&
            bookmark.name === action.bookmark.name
          ),
      );
    default:
      return state;
  }
};

export default bookmarksReducer;
