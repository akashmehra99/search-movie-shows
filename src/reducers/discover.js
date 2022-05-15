const discoverDefaultState = {
  genres: [],
  genre: "",
  contentType: "movie",
  category: "popular",
  rating: 2.5,
  error: false,
  results: [],
  page: 1,
  loading: false,
  searchParam: "",
  total_pages: 0,
};

const discoverReducer = (state = discoverDefaultState, action) => {
  switch (action.type) {
    case "SET_GENRES":
      return {
        ...state,
        genres: action.genres,
      };
    case "SET_GENRE":
      return {
        ...state,
        genre: action.genre,
      };
    case "SET_TYPE":
      return {
        ...state,
        contentType: action.contentType,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.category,
      };
    case "SET_RATING":
      return {
        ...state,
        rating: action.rating,
      };
    case "SET_RESULTS":
      return {
        ...state,
        results: [...state.results, ...action.results],
      };
    case "RESET_RESULTS":
      return {
        ...state,
        results: [],
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "SET_SEARCH_PARAM":
      return {
        ...state,
        searchParam: action.searchParam,
      };
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        total_pages: action.total_pages,
      };
    default:
      return state;
  }
};

export default discoverReducer;
