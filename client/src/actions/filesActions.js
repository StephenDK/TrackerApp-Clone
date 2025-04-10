import axios from "axios";
import {
  CLEAR_FILES,
  GET_COMPUTER_FILE,
  GET_COMPUTER_TYPE_FILE,
  GET_MONITOR_FILE,
  GET_DOCK_FILE,
  GET_DIVISION_FILE,
  GET_PHONE_FILE,
  GET_DESK_PHONE_FILE,
  GET_ACCESSORY_CATEGORY_FILE,
  GET_ITAM_CATEGORY_FILE,
  GET_ELECTIONS_FILE,
} from "./actionType";
import config from "../config";
import { setError } from "./errorActions";

export const GetComputerFile = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/documents/computers`);

    let payload = {
      data: req.data.computers,
    };
    dispatch({ type: GET_COMPUTER_FILE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET Computer Makes File"));
  }
};

export const GetComputerTypes = () => async (dispatch) => {
  try {
    const req = await axios.get(
      `${config.apiUrl}/api/v1/documents/computers/types`
    );
    let payload = {
      data: req.data.deviceTypes,
    };
    dispatch({ type: GET_COMPUTER_TYPE_FILE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET Computer Type File"));
  }
};

export const GetMonitorFile = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/documents/monitors`);

    let payload = {
      data: req.data.monitors,
    };
    dispatch({ type: GET_MONITOR_FILE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET Monitor File"));
  }
};

export const GetDivisionFile = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/documents/divisions`);

    let payload = {
      data: req.data.divisions,
    };
    dispatch({ type: GET_DIVISION_FILE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET Division File"));
  }
};

export const GetDockFile = () => async (dispatch) => {
  try {
    const req = await axios.get(
      `${config.apiUrl}/api/v1/documents/dockingstations`
    );

    let payload = {
      data: req.data.docks,
    };
    dispatch({ type: GET_DOCK_FILE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET Dock File"));
  }
};

export const GetPhoneFile = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/documents/phones`);

    let payload = {
      data: req.data.phones,
    };
    dispatch({ type: GET_PHONE_FILE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET Phone File"));
  }
};

export const GetDeskPhoneFile = () => async (dispatch) => {
  try {
    const req = await axios.get(
      `${config.apiUrl}/api/v1/documents/desk/phones`
    );

    let payload = {
      data: req.data.phones,
    };

    dispatch({ type: GET_DESK_PHONE_FILE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET Desk Phone File"));
  }
};

export const GetAccessoryCategoryFile = () => async (dispatch) => {
  try {
    const req = await axios.get(
      `${config.apiUrl}/api/v1/documents/accessory/categories`
    );

    let payload = {
      data: req.data.categories,
    };

    dispatch({ type: GET_ACCESSORY_CATEGORY_FILE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET Accessory Category File"));
  }
};

export const GetItamCategoryFile = () => async (dispatch) => {
  try {
    const req = await axios.get(
      `${config.apiUrl}/api/v1/documents/itam/categories`
    );

    let payload = {
      data: req.data.deviceCategories,
    };

    dispatch({ type: GET_ITAM_CATEGORY_FILE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET ITAM Category File"));
  }
};

export const GetElectionsFile = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/documents/elections`);

    let payload = {
      data: req.data.elections,
    };

    dispatch({ type: GET_ELECTIONS_FILE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET Election File"));
  }
};

export const ClearFiles = () => ({
  type: CLEAR_FILES,
});
