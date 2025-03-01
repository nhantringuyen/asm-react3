import { SHOW_POPUP, HIDE_POPUP } from "./actions";

const initialState = {
  isPopupVisible: false,
  product: null,
};

const popupReducer = (state = initialState, action) => {
  console.log("Action received:", action);
  switch (action.type) {
    case SHOW_POPUP:
      return {
        ...state,
        isPopupVisible: true,
        product: action.payload,
      };
    case HIDE_POPUP:
      return {
        ...state,
        isPopupVisible: false,
        product: null,
      };
    default:
      return state;
  }
};

export default popupReducer;
