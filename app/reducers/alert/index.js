export const initialState = {
  isVisible: false,
  autodismiss: null,
  content: null,
  data: null,
};

/**
 * @param {import('./types').AlertState | undefined} state
 * @param {any} action
 * @returns {import('./types').AlertState}
 */
const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        isVisible: true,
        autodismiss: action.autodismiss,
        content: action.content,
        data: action.data,
      };
    case 'HIDE_ALERT':
      return {
        ...state,
        isVisible: false,
        autodismiss: null,
      };
    default:
      return state;
  }
};
export default alertReducer;
