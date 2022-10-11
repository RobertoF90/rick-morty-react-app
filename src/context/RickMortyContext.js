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
    searchActive: false,
  };

  const [state, dispatch] = useReducer(rickMortyReducer, initialState);

  // MODAL

  // Modal loading animation => while fetching data from API
  const setModalLoading = () => {
    dispatch({
      type: 'SET_MODAL_LOADING',
    });
  };

  // Open / Close modal
  const openModal = async (id) => {
    // Find Character
    await setCharacterDetail(id);
    // Activate animation
    setModalLoading();
    // Find Episodes
    setEpisodes(id);
    //  Activate modal window
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
    const getCharacter = await fetch(`${API_URL}/character/${id}`);
    const character = await getCharacter.json();

    // Create array from episode numbers
    let episodes = [];
    character.episode.forEach((ep) => {
      return episodes.push(ep.split('/')[5]);
    });

    // Turn array of episodes into string and use it in API call
    const response = await fetch(`${API_URL}/episode/${episodes.join(',')}`);

    const results = await response.json();

    dispatch({
      type: 'SET_EPISODE',
      payload: results,
    });
  };

  // BOOKMARKS

  // Make API call to find character by ID
  const filterCharacter = async (id) => {
    const response = await fetch(`${API_URL}/character/${id}`);
    return await response.json();
  };

  const setBookmark = async (id) => {
    const character = await filterCharacter(id);

    // If character is already bookmarked, filter out the result and return new list
    if (state.bookmarks.some((b) => b.id === character.id)) {
      dispatch({
        type: 'REMOVE_BOOKMARK',
        payload: state.bookmarks.filter(
          (bookmark) => bookmark.id !== character.id
        ),
      });
    } else {
      // Add character to bookmark list
      dispatch({
        type: 'ADD_BOOKMARK',
        payload: [...state.bookmarks, character],
      });
    }
  };

  // Set Search active to show back button instead of pagination
  const setSearchActive = () => {
    dispatch({
      type: 'SET_SEARCH_ACTIVE',
    });
  };

  // GET search results
  const fetchCharacters = async (text) => {
    setLoading();

    let params = '';

    // IF page above 1, use page as search param => API takes "?page="" as query param after "/character" endpoint
    if (state.page > 1) {
      params = new URLSearchParams({
        page: state.page,
      });
    }

    // IF text is passed as argument, use "text" as search param
    if (text) {
      // Reset page to 0
      changePage(-state.page);
      // Change pagination buttons to BACK
      setSearchActive();
      params = new URLSearchParams({
        name: text,
      });
    }

    // Prevent empty search input from resetting dashboard without pagination buttons
    if (!text && state.page === 0) {
      changePage(1);
    }

    const response = await fetch(`${API_URL}/character/?${params}`);
    const { results } = await response.json();

    if (results) {
      dispatch({
        type: 'GET_CHARACTERS',
        payload: results,
      });
    } else {
      // if no results, go back to page 1 and reset characters
      dispatch({
        type: 'CHANGE_PAGE',
        payload: 1,
      });
      fetchCharacters();
    }
  };

  const changePage = (value) => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: (state.page += value),
    });
  };

  // Uses same function as setBookmark for filtering character by ID
  const setCharacterDetail = async (id) => {
    const character = await filterCharacter(id);
    dispatch({
      type: 'SET_CHARACTER_DETAIL',
      payload: character,
    });
  };

  // Loading animation
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
        searchActive: state.searchActive,
      }}
    >
      {children}
    </RickMortyContext.Provider>
  );
};

export default RickMortyContext;
