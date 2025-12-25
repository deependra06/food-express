import { createSlice } from "@reduxjs/toolkit";
import { storage, generateShortId } from "../../storage/data";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    list: storage.getOrders(),
  },
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: generateShortId(),
        date: new Date().toISOString(),
        status: "confirmed",
        ...action.payload,
      };
      state.list.unshift(newOrder);
      storage.saveOrders(state.list);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.list.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
        storage.saveOrders(state.list);
      }
    },
    deleteOrder: (state, action) => {
      state.list = state.list.filter((o) => o.id !== action.payload);
      storage.saveOrders(state.list);
    },
  },
});

export const { addOrder, updateOrderStatus, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
