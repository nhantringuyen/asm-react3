import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import popupReducer from "./reducer"; // Thêm reducer từ đoạn code cũ
import cartReducer from "./cartSlice";
// Kết hợp nhiều reducers
const rootReducer = combineReducers({
  auth: authReducer,
  popup: popupReducer,
  cart: cartReducer,
});

// Tạo store với Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
});

export default store;