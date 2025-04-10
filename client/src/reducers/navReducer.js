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
} from "../actions/actionType";

const initialState = {
  open_drawer: false,
  mode: "light",
  light: true,
  toggleCart: false,
  itemViews: {
    toggleCheckOut: false,
    toggleCheckIn: false,
    toggleEdit: false,
    toggleTags: false,
    toggleLines: false,
    toggleTelework: false,
    toggleArchive: false,
    toggleQRCode: false,
    toggleDelete: false,
  },
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NAV:
      return {
        ...state,
        open_drawer: true,
      };
    case CLOSE_NAV:
      return {
        ...state,
        open_drawer: false,
      };
    case TOGGLE_CART:
      return {
        ...state,
        toggleCart: !state.toggleCart,
      };
    case TOGGLE_THEME:
      return {
        ...state,
        light: !state.light,
        mode: state.light ? "dark" : "light",
      };
    case TOGGLE_CHECKIN:
      return {
        ...state,
        itemViews: {
          toggleCheckOut: false,
          toggleCheckIn: !state.itemViews.toggleCheckIn,
          toggleEdit: false,
          toggleTags: false,
          toggleArchive: false,
          toggleTelework: false,
          toggleDelete: false,
        },
      };
    case TOGGLE_CHECKOUT:
      return {
        ...state,
        itemViews: {
          toggleCheckOut: !state.itemViews.toggleCheckOut,
          toggleCheckIn: false,
          toggleEdit: false,
          toggleTags: false,
          toggleArchive: false,
          toggleTelework: false,
          toggleDelete: false,
        },
      };
    case TOGGLE_EDIT:
      return {
        ...state,
        itemViews: {
          toggleCheckOut: false,
          toggleCheckIn: false,
          toggleEdit: !state.itemViews.toggleEdit,
          toggleTags: false,
          toggleArchive: false,
          toggleTelework: false,
          toggleDelete: false,
        },
      };
    case TOGGLE_TAGS:
      return {
        ...state,
        itemViews: {
          toggleCheckOut: false,
          toggleCheckIn: false,
          toggleEdit: false,
          toggleTags: !state.itemViews.toggleTags,
          toggleArchive: false,
          toggleTelework: false,
          toggleDelete: false,
        },
      };
    case TOGGLE_LINES:
      return {
        ...state,
        itemViews: {
          toggleCheckOut: false,
          toggleCheckIn: false,
          toggleEdit: false,
          toggleTags: false,
          toggleLines: !state.itemViews.toggleLines,
          toggleArchive: false,
          toggleTelework: false,
          toggleDelete: false,
        },
      };
    case TOGGLE_TELEWORK:
      return {
        ...state,
        itemViews: {
          toggleCheckOut: false,
          toggleCheckIn: false,
          toggleEdit: false,
          toggleTags: false,
          toggleTelework: !state.itemViews.toggleTelework,
          toggleArchive: false,
          toggleDelete: false,
        },
      };
    case TOGGLE_ARCHIVE:
      return {
        ...state,
        itemViews: {
          toggleCheckOut: false,
          toggleCheckIn: false,
          toggleEdit: false,
          toggleTags: false,
          toggleTelework: false,
          toggleArchive: !state.itemViews.toggleArchive,
          toggleDelete: false,
        },
      };
    case TOGGLE_QR_CODE:
      return {
        ...state,
        itemViews: {
          toggleCheckOut: false,
          toggleCheckIn: false,
          toggleEdit: false,
          toggleTags: false,
          toggleTelework: false,
          toggleArchive: false,
          toggleQRCode: !state.itemViews.toggleQRCode,
          toggleDelete: false,
        },
      };
    case TOGGLE_DELETE:
      return {
        ...state,
        itemViews: {
          toggleCheckOut: false,
          toggleCheckIn: false,
          toggleEdit: false,
          toggleTags: false,
          toggleTelework: false,
          toggleArchive: false,
          toggleDelete: !state.itemViews.toggleDelete,
        },
      };
    case TOGGLE_CANCEL:
      return {
        ...state,
        itemViews: {
          toggleCheckOut: false,
          toggleCheckIn: false,
          toggleEdit: false,
          toggleTags: false,
          toggleLines: false,
          toggleTelework: false,
          toggleArchive: false,
          toggleQRCode: false,
          toggleDelete: false,
        },
      };
    default:
      return state;
  }
};

export default navReducer;
