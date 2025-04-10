import {
  DATA_SET_INTENTORY,
  DATA_SET_COMPUTERS,
  DATA_SET_PHONES,
  DATA_SET_DESKPHONES,
  DATA_SET_MONITORS,
  DATA_SET_ACCESSORIES,
  DATA_SET_ITAM,
  DATA_SET_DOCKS,
  DATA_SET_CLEAR,
  DATA_SET_ARCHIVE,
} from "../actions/actionType";

const initialState = {
  Inventory: [],
  Computers: [],
  Phones: [],
  Docks: [],
  Monitors: [],
  DeskPhones: [],
  Accessories: [],
  ITAM: [],
  Archive: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_SET_INTENTORY:
      return {
        ...state,
        Inventory: action.payload.data,
      };
    case DATA_SET_COMPUTERS:
      return {
        ...state,
        Computers: action.payload.data,
      };
    case DATA_SET_PHONES:
      return {
        ...state,
        Phones: action.payload.data,
      };
    case DATA_SET_DESKPHONES:
      return {
        ...state,
        DeskPhones: action.payload.data,
      };
    case DATA_SET_MONITORS:
      return {
        ...state,
        Monitors: action.payload.data,
      };
    case DATA_SET_ACCESSORIES:
      return {
        ...state,
        Accessories: action.payload.data,
      };
    case DATA_SET_DOCKS:
      return {
        ...state,
        Docks: action.payload.data,
      };
    case DATA_SET_ITAM:
      return {
        ...state,
        ITAM: action.payload.data,
      };
    case DATA_SET_ARCHIVE:
      return {
        ...state,
        Archive: action.payload.data,
      };
    case DATA_SET_CLEAR:
      return {
        Inventory: [],
        Computers: [],
        Phones: [],
        Docks: [],
        Monitors: [],
        DeskPhones: [],
        Accessories: [],
        ITAM: [],
        Archive: [],
      };
    default:
      return state;
  }
};

export default dataReducer;
