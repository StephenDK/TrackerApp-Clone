import {
  GET_COMPUTER_FILE,
  GET_COMPUTER_TYPE_FILE,
  GET_MONITOR_FILE,
  GET_DOCK_FILE,
  GET_PHONE_FILE,
  GET_DIVISION_FILE,
  GET_DESK_PHONE_FILE,
  GET_ACCESSORY_CATEGORY_FILE,
  GET_ITAM_CATEGORY_FILE,
  GET_ELECTIONS_FILE,
  CLEAR_FILES,
} from "../actions/actionType";

const initialState = {
  jsonFiles: {
    computers: [],
    monitors: [],
    docks: [],
    phones: [],
    deskphones: [],
    divisions: [],
    computerTypes: [],
    accessoryCategories: [],
    itamCategories: [],
    elections: [],
  },
};

const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPUTER_FILE:
      //   const [fileName, data] = action;
      return {
        jsonFiles: {
          ...state.jsonFiles,
          computers: action.payload.data,
        },
      };
    case GET_COMPUTER_TYPE_FILE:
      return {
        jsonFiles: {
          ...state.jsonFiles,
          computerTypes: action.payload.data,
        },
      };
    case GET_MONITOR_FILE:
      return {
        jsonFiles: {
          ...state.jsonFiles,
          monitors: action.payload.data,
        },
      };
    case GET_DIVISION_FILE:
      return {
        jsonFiles: {
          ...state.jsonFiles,
          divisions: action.payload.data,
        },
      };
    case GET_DOCK_FILE:
      return {
        jsonFiles: {
          ...state.jsonFiles,
          docks: action.payload.data,
        },
      };
    case GET_PHONE_FILE:
      return {
        jsonFiles: {
          ...state.jsonFiles,
          phones: action.payload.data,
        },
      };
    case GET_DESK_PHONE_FILE:
      return {
        jsonFiles: {
          ...state.jsonFiles,
          deskphones: action.payload.data,
        },
      };
    case GET_ACCESSORY_CATEGORY_FILE:
      return {
        jsonFiles: {
          ...state.jsonFiles,
          accessoryCategories: action.payload.data,
        },
      };
    case GET_ITAM_CATEGORY_FILE:
      return {
        jsonFiles: {
          ...state.jsonFiles,
          itamCategories: action.payload.data,
        },
      };
    case GET_ELECTIONS_FILE:
      return {
        jsonFiles: {
          ...state.jsonFiles,
          elections: action.payload.data,
        },
      };
    case CLEAR_FILES:
      return {
        jsonFiles: {
          computers: [],
          monitors: [],
          dockMakes: [],
          dockModels: [],
          phones: [],
          deskphones: [],
          divisions: [],
          computerTypes: [],
          accessoryCategories: [],
          itamCategories: [],
          elections: [],
        },
      };
    default:
      return state;
  }
};

export default filesReducer;
