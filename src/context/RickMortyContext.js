import { createContext, useReducer } from 'react';
import rickMortyReducer from './RickMortyReducer';

const RickMortyContext = createContext();

const API_URL = 'https://rickandmortyapi.com/api/';

export const RickMortyProvider = ({ children }) => {
  const initialState = {
    characters: [],
    characterDetail: null,
    bookmarks: [],
    episodes: [],
    loading: true,
    modalLoading: false,
    page: 1,
    modalIsOpen: false,
  };

  const [state, dispatch] = useReducer(rickMortyReducer, initialState);

  // MODAL

  const setModalLoading = () => {
    dispatch({
      type: 'SET_MODAL_LOADING',
    });
  };

  // Open / Close modal
  const openModal = async (id) => {
    await setCharacterDetail(id);
    setModalLoading();
    setEpisodes(id);
    dispatch({
      type: 'SET_MODAL',
      payload: true,
    });
  };

  const closeModal = () =>
    dispatch({
      type: 'SET_MODAL',
      payload: false,
    });

  const setEpisodes = async (id) => {
    let episodes = [];

    const getCharacter = await fetch(`${API_URL}/character/${id}`);

    const character = await getCharacter.json();

    character.episode.forEach((ep) => {
      return episodes.push(ep.split('/')[5]);
    });
    const response = await fetch(`${API_URL}/episode/${episodes.join(',')}`);

    const results = await response.json();

    dispatch({
      type: 'SET_EPISODE',
      payload: results,
    });
  };

  // BOOKMARKS

  const setBookmark = (id) => {
    const [character] = filterCharacter(id);

    if (state.bookmarks.includes(character)) {
      dispatch({
        type: 'REMOVE_BOOKMARK',
        payload: state.bookmarks.filter(
          (bookmark) => bookmark.id !== character.id
        ),
      });
    } else {
      dispatch({
        type: 'ADD_BOOKMARK',
        payload: [...state.bookmarks, character],
      });
    }
  };

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
      // Reset page to 0
      changePage(-state.page);
      params = new URLSearchParams({
        name: text,
      });
    }

    const response = await fetch(`${API_URL}/character/?${params}`);

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

  const filterCharacter = (id) => {
    return state.characters.filter((character) => character.id === id);
  };

  const setCharacterDetail = async (id) => {
    let [character] = filterCharacter(id);

    if (!character) {
      const response = await fetch(`${API_URL}/character/${id}`);

      character = await response.json();
    }

    dispatch({
      type: 'SET_CHARACTER_DETAIL',
      payload: character,
    });
  };

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <RickMortyContext.Provider
      value={{
        characters: state.characters,
        loading: state.loading,
        fetchCharacters,
        modalLoading: state.modalLoading,
        openModal,
        closeModal,
        modalIsOpen: state.modalIsOpen,
        setEpisodes,
        episodes: state.episodes,
        setCharacterDetail,
        characterDetail: state.characterDetail,
        bookmarks: state.bookmarks,
        setBookmark,
        page: state.page,
        changePage,
      }}
    >
      {children}
    </RickMortyContext.Provider>
  );
};

export default RickMortyContext;
