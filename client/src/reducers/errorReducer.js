const initialState = {
  errorMsg: "",
  errorFlag: false,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        errorMsg: action.payload,
        errorFlag: true,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        errorMsg: "",
        errorFlag: false,
      };
    default:
      return state;
  }
};

export default errorReducer;
