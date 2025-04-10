import { SET_ERROR, CLEAR_ERROR } from "./actionType";

export const setError = (errorMsg) => ({
  type: SET_ERROR,
  payload: errorMsg,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
