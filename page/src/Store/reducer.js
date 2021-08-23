// import * as Constants from "../components/common/Constants";

const initialState = {
  searchCount: 0,
  nextCount: 0,
  prevCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SERACH_COUNT":
      return {
        ...state,
        searchCount: action.payload,
      };

    case "NEXT_COUNT":
      return {
        ...state,
        nextCount: action.payload,
      };

    case "PREV_COUNT":
      return {
        ...state,
        prevCount: action.payload,
      };

    case "RESET_COUNT":
      return {
        ...state,
        searchCount: action.payload,
        nextCount: action.payload,
        prevCount: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
