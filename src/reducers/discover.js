const discoverDefaultState = {
  genres: [],
  genre: "",
  contentType: "movie",
  category: "popular",
  error: false,
  results: [],
  page: 1,
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
    default:
      return state;
  }
};

export default discoverReducer;
