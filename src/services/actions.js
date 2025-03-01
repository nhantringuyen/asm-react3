// Action types
export const SHOW_POPUP = "SHOW_POPUP";
export const HIDE_POPUP = "HIDE_POPUP";

// Action creators
export const showPopup = (product) => ({
  type: "SHOW_POPUP",
  payload: product,
});

export const hidePopup = () => ({
  type: "HIDE_POPUP",
});
