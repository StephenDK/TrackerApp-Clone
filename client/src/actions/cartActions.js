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

// Clear USER from State
export const CartAddComputer = (computer) => ({
  type: CART_ADD_COMPUTER,
});

// Clear USER from State
export const CartAddMonitor = (monitor) => ({
  type: CART_ADD_MONITOR,
});

// Clear USER from State
export const CartAddPhone = (phone) => ({
  type: CART_ADD_PHONE,
});

// Clear USER from State
export const CartAddDock = (dock) => ({
  type: CART_ADD_DOCK,
});

// Clear USER from State
export const CartAddAccessory = (accessory) => ({
  type: CART_ADD_ACCESSORY,
});

// Clear USER from State
export const CartAddDeskphone = (deskphone) => ({
  type: CART_ADD_DESK_PHONE,
});

// Remove From Cart

export const CartRemoveCamputer = (computer) => ({
  type: CART_REMOVE_COMPUTER,
});

// Clear USER from State
export const CartRemoveMonitor = (monitor) => ({
  type: CART_REMOVE_MONITOR,
});

// Clear USER from State
export const CartRemoveMonitors = (monitor) => ({
  type: CART_REMOVE_MONITORS,
});

// Clear USER from State
export const CartRemovePhone = (phone) => ({
  type: CART_REMOVE_PHONE,
});

// Clear USER from State
export const CartRemoveDock = (dock) => ({
  type: CART_REMOVE_DOCK,
});

// Clear USER from State
export const CartRemoveDeskphone = (deskphone) => ({
  type: CART_REMOVE_DESK_PHONE,
});

// Clear USER from State
export const CartRemoveAccessory = (accessory) => ({
  type: CART_REMOVE_ACCESSORY,
});

// Clear USER from State
export const CartRemoveAccessorys = (accessory) => ({
  type: CART_REMOVE_ACCESSORYS,
});
