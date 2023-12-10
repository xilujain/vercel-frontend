import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
export const fetchOrder = createAsyncThunk('product/fetchOrder', async () => {
  const response = await api.get('/mock/e-commerce/orders.json')
  return response.data
})

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
  searchItem: string
}

const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false,
  searchItem: ''
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    deleteOrder: (state, action) => {
      const filterCategories = state.orders.filter((order) => order.id != action.payload)
      state.orders = filterCategories
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.error.message || 'Error'
      })
  }
})

export const { deleteOrder } = orderSlice.actions
export default orderSlice.reducer
