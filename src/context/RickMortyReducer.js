const rickMortyReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CHARACTERS':
      return {
        ...state,
        characters: action.payload,
        loading: false,
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
