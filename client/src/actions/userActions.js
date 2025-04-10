import { CLEAR_USER, GET_USER, SET_USER } from "./actionType";
import axios from "axios";
import config from "../config";

// API req for user information
export const GetUser = (token) => async (dispatch) => {
  try {
    const req = await axios.post(`${config.apiUrl}/api/v1/auth/isauth`, {
      token,
    });

    let payload = {
      ...req.data.data,
    };
    dispatch({ type: SET_USER, payload });
  } catch (err) {
    console.log(err);
  }
};

export const SetUser = (user) => ({
  type: SET_USER,
  payload: user,
});

// Clear USER from State
export const ClearUser = () => ({
  type: CLEAR_USER,
});
