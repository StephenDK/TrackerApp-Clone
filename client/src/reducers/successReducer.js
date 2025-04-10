const initialState = {
  successMsg: "",
  successFlag: false,
};

const successReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SUCCESS":
      return {
        ...state,
        successMsg: action.payload,
        successFlag: true,
      };
    case "CLEAR_SUCCESS":
      return {
        ...state,
        successMsg: "",
        successFlag: false,
      };
    default:
      return state;
  }
};

export default successReducer;
