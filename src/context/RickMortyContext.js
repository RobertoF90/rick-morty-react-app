import { createContext, useReducer } from 'react';
import rickMortyReducer from './RickMortyReducer';

const RickMortyContext = createContext();

const API_URL = 'https://rickandmortyapi.com/api/character';

export const RickMortyProvider = ({ children }) => {
  const initialState = {
    characters: [],
    loading: true,
    page: 1,
  };

  const [state, dispatch] = useReducer(rickMortyReducer, initialState);

  // GET search results
  const fetchCharacters = async (text) => {
    setLoading(true);

    let params = '';

    if (state.page > 1) {
      params = new URLSearchParams({
        page: state.page,
      });
    }

    if (text) {
      changePage(-state.page);
      params = new URLSearchParams({
        name: text,
      });
    }

    const response = await fetch(`${API_URL}?${params}`);

    const { results } = await response.json();
    dispatch({
      type: 'GET_CHARACTERS',
      payload: results,
    });
  };

  const changePage = (value) => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: (state.page += value),
    });
  };

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <RickMortyContext.Provider
      value={{
        characters: state.characters,
        loading: state.loading,
        fetchCharacters,
        page: state.page,
        changePage,
      }}
    >
      {children}
    </RickMortyContext.Provider>
  );
};

export default RickMortyContext;
