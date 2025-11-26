import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildApiUrl } from '@/config';

const initialState = {
  products: [],
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  '/product/addnewproduct',
  async (formData) => {
    const result = await axios.post(
      buildApiUrl('api/admin/products/add'),
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return result?.data;
  }
);
export const fetchAllProducts = createAsyncThunk('/product/fetchAllProdcts', async () => {
  const result = await axios.get(buildApiUrl('api/admin/products/get'));
  return result?.data;
});
export const editProduct = createAsyncThunk(
  '/product/editProduct',
  async ({ formData, id }) => {
    const result = await axios.put(
      buildApiUrl(`api/admin/products/edit/${id}`),
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk('/product/deleteProduct', async (id) => {
  const result = await axios.delete(
    buildApiUrl(`api/admin/products/delete/${id}`),

    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return result.data;
});

const AdminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
