import {
  CART_ADD_COMPUTER,
  CART_ADD_DOCK,
  CART_ADD_MONITOR,
  CART_ADD_PHONE,
  CART_ADD_ACCESSORY,
  CART_ADD_DESK_PHONE,
  CART_REMOVE_COMPUTER,
  CART_REMOVE_MONITOR,
  CART_REMOVE_MONITORS,
  CART_REMOVE_DOCK,
  CART_REMOVE_DESK_PHONE,
  CART_REMOVE_PHONE,
  CART_REMOVE_ACCESSORY,
  CART_REMOVE_ACCESSORYS,
} from "../actions/actionType";

// Error Actions
import { setError } from "../actions/errorActions";

const initialState = {
  computer: {},
  monitors: [],
  phone: {},
  dock: {},
  deskphone: {},
  accessories: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_COMPUTER:
      return {
        ...state,
        computer: action.payload,
      };
    case CART_ADD_MONITOR:
      if (state.monitors.length < 2) {
        return {
          ...state,
          monitors: [...state.monitors, action.payload],
        };
      }
      setError("You can only add up to 2 monitors to the cart");
      return state;
    case CART_ADD_PHONE:
      return {
        ...state,
        phone: action.payload,
      };
    case CART_ADD_DOCK:
      return {
        ...state,
        dock: action.payload,
      };
    case CART_ADD_DESK_PHONE:
      return {
        ...state,
        deskphone: action.payload,
      };
    case CART_ADD_ACCESSORY:
      return {
        ...state,
        accessories: [...state.accessories, action.payoad],
      };
    case CART_REMOVE_COMPUTER:
      return {
        ...state,
        computer: {},
      };
    case CART_REMOVE_MONITOR:
      const monitorSerial = action.payload.monitorID;
      return {
        ...state,
        monitors: state.monitors.filter(
          (monitor) => monitor.serial !== monitorSerial
        ),
      };
    case CART_REMOVE_MONITORS:
      return {
        ...state,
        monitors: [],
      };
    case CART_REMOVE_PHONE:
      return {
        ...state,
        phone: {},
      };
    case CART_REMOVE_DOCK:
      return {
        ...state,
        dock: {},
      };
    case CART_REMOVE_DESK_PHONE:
      return {
        ...state,
        deskphone: {},
      };
    case CART_REMOVE_ACCESSORY:
      const accessoryBarCode = action.payload.barcode;
      return {
        ...state,
        accessories: state.accessories.filter(
          (item) => item.barcode !== accessoryBarCode
        ),
      };
    case CART_REMOVE_ACCESSORYS:
      return {
        ...state,
        accessories: {},
      };
    default:
      return state;
  }
};

export default cartReducer;
