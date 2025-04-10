import { SET_SUCCESS, CLEAR_SUCCESS } from "./actionType";

export const setSuccess = (successMsg) => ({
  type: SET_SUCCESS,
  payload: successMsg,
});

export const clearSuccess = () => ({
  type: CLEAR_SUCCESS,
});
