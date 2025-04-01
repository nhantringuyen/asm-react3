import { createSlice } from "@reduxjs/toolkit";

// Kiểm tra localStorage để xem người dùng có đang đăng nhập không
const storedUser = JSON.parse(localStorage.getItem("currentUser"));

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: storedUser || null, // Nếu có user trong localStorage, giữ trạng thái đăng nhập
    },
    reducers: {
        ON_LOGIN: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
        ON_LOGOUT: (state) => {
            state.user = null;
            localStorage.removeItem("currentUser");
        },
    },
});

export const { ON_LOGIN, ON_LOGOUT } = authSlice.actions;
export default authSlice.reducer;
