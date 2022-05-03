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
