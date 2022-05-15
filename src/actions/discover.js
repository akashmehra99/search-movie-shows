export const setGenres = (genres = []) => ({
  type: "SET_GENRES",
  genres,
});

export const setGenre = (genre = "") => ({
  type: "SET_GENRE",
  genre,
});

export const setType = (contentType = "") => ({
  type: "SET_TYPE",
  contentType,
});

export const setCategory = (category = "popular") => ({
  type: "SET_CATEGORY",
  category,
});

export const setRating = (rating = 2.5) => ({
  type: "SET_RATING",
  rating
})

export const setResults = (results = []) => ({
  type: "SET_RESULTS",
  results,
});

export const resetResults = () => ({
  type: "RESET_RESULTS",
});

export const setPage = (page = 1) => ({
  type: "SET_PAGE",
  page,
});

export const setLoading = (loading = false) => ({
  type: "SET_LOADING",
  loading,
});

export const setSearchParam = (searchParam = "") => ({
  type: "SET_SEARCH_PARAM",
  searchParam,
});

export const setTotalPages = (total_pages = 0) => ({
  type: "SET_TOTAL_PAGES",
  total_pages,
});
