import {
  OPEN_NAV,
  CLOSE_NAV,
  TOGGLE_CART,
  TOGGLE_THEME,
  TOGGLE_CHECKIN,
  TOGGLE_CHECKOUT,
  TOGGLE_DELETE,
  TOGGLE_EDIT,
  TOGGLE_TAGS,
  TOGGLE_LINES,
  TOGGLE_TELEWORK,
  TOGGLE_ARCHIVE,
  TOGGLE_CANCEL,
  TOGGLE_QR_CODE,
} from "./actionType";

export const Open_Nav = () => ({
  type: OPEN_NAV,
});

export const Close_Nav = () => ({
  type: CLOSE_NAV,
});

export const ToggleTheme = () => ({
  type: TOGGLE_THEME,
});

export const ToggleCart = () => ({
  type: TOGGLE_CART,
});

export const ToggleCheckIn = () => ({
  type: TOGGLE_CHECKIN,
});

export const ToggleCheckOut = () => ({
  type: TOGGLE_CHECKOUT,
});

export const ToggleEdit = () => ({
  type: TOGGLE_EDIT,
});

export const ToggleTags = () => ({
  type: TOGGLE_TAGS,
});

export const ToggleLines = () => ({
  type: TOGGLE_LINES,
});

export const ToggleTelework = () => ({
  type: TOGGLE_TELEWORK,
});

export const ToggleDelete = () => ({
  type: TOGGLE_DELETE,
});

export const ToggleArchive = () => ({
  type: TOGGLE_ARCHIVE,
});

export const ToggleQRCode = () => ({
  type: TOGGLE_QR_CODE,
});

export const ToggleCancel = () => ({
  type: TOGGLE_CANCEL,
});
