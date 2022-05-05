import axios from "axios";

export const discoverAPI = function (api_key) {
  var api_key = api_key || "3a94078fb34b772a31d9a1348035bed7";
  var genres = [];
  var api_url_path = "https://api.themoviedb.org/3/";
  var params = {
    api_key,
  };
  var getGenres = async function () {
    if (!genres.length) {
      await axios
        .get(`${api_url_path}genre/movie/list`, { params })
        .then((res) => {
          genres = res.data.genres;
        })
        .catch((error) => console.log("Error in fetching generes", error));
    }
    return genres;
  };

  var getResults = async function ({ page = 1, contentType, genre, category, rating = 2.5 }) {
    let api_url = `${api_url_path}discover/`;
    api_url += contentType;
    let req_params = { ...params, page };
    if (genre) {
      req_params.with_genres = genre;
    }
    if (category === "popular") {
      req_params.sort_by = "popularity.desc";
    } else if (category === "latest") {
      req_params.sort_by = "release_date.desc";
    } else if (category === "top_rated") {
      req_params.sort_by = "vote_average.desc";
    } else {
      req_params.sort_by = "vote_count.desc";
    }
    req_params.vote_average = {
      gte: rating
    };
    let results = {};
    await axios
      .get(api_url, { params: req_params })
      .then((data) => {
        results = data.data;
      })
      .catch((error) => console.error(error));
    return results;
  };

  return {
    getGenres,
    getResults,
  };
};
