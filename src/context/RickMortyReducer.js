const rickMortyReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CHARACTERS':
      return {
        ...state,
        characters: action.payload,
        loading: false,
      };
    case 'SET_MODAL_LOADING':
      return {
        ...state,
        modalLoading: true,
      };
    case 'SET_MODAL':
      return {
        ...state,
        modalIsOpen: action.payload,
      };
    case 'SET_EPISODE':
      return {
        ...state,
        episodes: action.payload,
        modalLoading: false,
      };
    case 'SET_CHARACTER_DETAIL':
      return {
        ...state,
        characterDetail: action.payload,
      };
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: action.payload,
      };
    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarks: action.payload,
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        page: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default rickMortyReducer;
