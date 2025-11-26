import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildApiUrl } from '@/config';

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  '/address/addNewAddress',
  async (formData) => {
    const reponse = await axios.post(
      buildApiUrl('api/shop/address/add'),
      formData
    );
    return reponse.data;
  }
);
export const fetchAllAddress = createAsyncThunk(
  '/address/fetchAllAddress',
  async (userId) => {
    const reponse = await axios.get(
      buildApiUrl(`api/shop/address/get/${userId}`)
    );
    return reponse.data;
  }
);
export const editAddress = createAsyncThunk(
  '/address/editAddress',
  async ({ userId, addressId, formData }) => {
    const reponse = await axios.put(
      buildApiUrl(`api/shop/address/update/${userId}/${addressId}`),
      formData
    );
    return reponse.data;
  }
);
export const deleteAddress = createAsyncThunk(
  '/address/deleteAddress',
  async ({ userId, addressId }) => {
    const reponse = await axios.delete(
      buildApiUrl(`api/shop/address/delete/${userId}/${addressId}`)
    );
    return reponse.data;
  }
);

const addressSlice = createSlice({
  name: 'addresss',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addNewAddress.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchAllAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addressList = action.payload.data;
    });
    builder.addCase(fetchAllAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.addressList = [];
    });
  },
});

export default addressSlice.reducer;
