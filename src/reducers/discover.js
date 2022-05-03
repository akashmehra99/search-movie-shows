const discoverDefaultState = {
    genres: []
};

const discoverReducer = (state = discoverDefaultState, action) => {
    switch (action.type) {
        case "SET_GENRES":
            return {
                ...state,
                genres: [...action.genres]
            };
        default: return state;
    }
};

export default discoverReducer;