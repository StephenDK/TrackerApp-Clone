import { CLEAR_USER, GET_USER, SET_USER } from "../actions/actionType";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...action.payload,
      };
    case SET_USER:
      return {
        ...action.payload,
      };
    case CLEAR_USER:
      return {};
    default:
      return state;
  }
};

export default userReducer;
