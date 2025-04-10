import axios from "axios";
import {
  DATA_SET_INTENTORY,
  DATA_SET_COMPUTERS,
  DATA_SET_PHONES,
  DATA_SET_DESKPHONES,
  DATA_SET_MONITORS,
  DATA_SET_ACCESSORIES,
  DATA_SET_DOCKS,
  DATA_SET_ITAM,
  DATA_SET_ARCHIVE,
} from "./actionType";
import config from "../config";
import { setError } from "./errorActions";

export const GetInventoryData = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/devices`);
    console.log("DATA ACTION", req);
    let payload = {
      data: req.data.data,
    };
    dispatch({ type: DATA_SET_INTENTORY, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET, SUM of DEVICES"));
  }
};

export const GetComputerData = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/computers/inventory`);

    let payload = {
      data: req.data.data,
    };
    dispatch({ type: DATA_SET_COMPUTERS, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET, COMPUTER DATA"));
  }
};

export const GetPhoneData = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/phones/inventory`);

    let payload = {
      data: req.data.data,
    };
    dispatch({ type: DATA_SET_PHONES, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET, PHONE DATA"));
  }
};

export const GetMonitorData = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/monitors/inventory`);

    let payload = {
      data: req.data.data,
    };
    dispatch({ type: DATA_SET_MONITORS, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET, MONITOR DATA"));
  }
};

export const GetDeskPhoneData = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/deskphones/inventory`);

    let payload = {
      data: req.data.data,
    };
    dispatch({ type: DATA_SET_DESKPHONES, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET, DESK PHONE DATA"));
  }
};

export const GetAccessoryData = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/accessory/inventory`);

    let payload = {
      data: req.data.data,
    };
    dispatch({ type: DATA_SET_ACCESSORIES, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET, ACCESSORY DATA"));
  }
};

export const GetDockingStationData = () => async (dispatch) => {
  try {
    const req = await axios.get(
      `${config.apiUrl}/api/v1/dockingstations/inventory`
    );

    let payload = {
      data: req.data.data,
    };
    dispatch({ type: DATA_SET_DOCKS, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET, DOCKINGSTATION DATA"));
  }
};

export const GetITAMData = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/itam/inventory`);

    let payload = {
      data: req.data.data,
    };
    dispatch({ type: DATA_SET_ITAM, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET, ITAM DATA"));
  }
};

export const GetArchiveData = () => async (dispatch) => {
  try {
    const req = await axios.get(`${config.apiUrl}/api/v1/devices/archive`);
    console.log("DATA ACTION", req);
    let payload = {
      data: req.data.data,
    };
    dispatch({ type: DATA_SET_ARCHIVE, payload });
  } catch (err) {
    dispatch(setError("ERROR: GET, ARCHIVE"));
  }
};
