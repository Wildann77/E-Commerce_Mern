import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildApiUrl } from '@/config';

const initialState = {
  orderList: [],
  orderDetails: null,
};
export const getAllOrdersForAdmin = createAsyncThunk(
  '/order/getAllOrdersForAdmin',
  async () => {
    const response = await axios.get(buildApiUrl('api/admin/orders/get'));
    return response.data; // <== Ini penting!
  }
);


export const getOrderDetailsForAdmin = createAsyncThunk(
  '/order/getOrderDetailsForAdmin',
  async (id) => {
    const response = await axios.get(
      buildApiUrl(`api/admin/orders/details/${id}`)
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  '/order/updateOrderStatus',
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      buildApiUrl(`api/admin/orders/update/${id}`),
      {
        orderStatus,
      }
    );

    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: 'adminOrderSlice',
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log('resetOrderDetails');

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        console.log('✅ Fetched orders:', action.payload); // DEBUG
        state.isLoading = false;
        state.orderList = action.payload.data; // ✅ langsung assign array
      })

      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
