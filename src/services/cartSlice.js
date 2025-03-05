import { createSlice } from "@reduxjs/toolkit";

// Lấy dữ liệu giỏ hàng từ localStorage (nếu có)
const storedCart = localStorage.getItem("cart");
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        listCart: initialCart,
    },
    reducers: {
        // 1️⃣ Thêm sản phẩm vào giỏ hàng
        ADD_CART: (state, action) => {
            const item = action.payload;
            const existingItem = state.listCart.find((product) => product._id.$oid === item._id.$oid);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.listCart.push({ ...item, quantity: 1 });
            }

            // Cập nhật localStorage
            localStorage.setItem("cart", JSON.stringify(state.listCart));
        },

        // 2️⃣ Cập nhật số lượng sản phẩm
        UPDATE_CART: (state, action) => {
            const { id, quantity } = action.payload;
            const index = state.listCart.findIndex((item) => item._id.$oid === id);

            if (index !== -1 && quantity > 0) {
                state.listCart[index].quantity = quantity;
            }

            localStorage.setItem("cart", JSON.stringify(state.listCart));
        },

        // 3️⃣ Xóa sản phẩm khỏi giỏ hàng
        DELETE_CART: (state, action) => {
            state.listCart = state.listCart.filter((item) => item._id.$oid !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.listCart));
        },
    },
});

export const { ADD_CART, UPDATE_CART, DELETE_CART } = cartSlice.actions;
export default cartSlice.reducer;
