import axios from "axios";

export const discoverAPI = function (api_key) {
    var api_key = api_key || "3a94078fb34b772a31d9a1348035bed7";
    var genres = [];

    var getGenres = async function () {
        if (!genres.length) {
            await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`)
                .then((res) => {
                    genres = res.data.genres;
                })
                .catch((error) => console.log("Error in fetching generes", error));

        }
        return genres;
    }

    return {
        getGenres
    };
}