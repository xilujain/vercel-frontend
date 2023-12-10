import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
export const fetchCategories = createAsyncThunk('product/fetchCategories', async () => {
  const response = await api.get('/mock/e-commerce/categories.json')
  return response.data
})

export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
  searchItem: string
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false,
  searchItem: ''
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    deleteCategory: (state, action) => {
      const filterCategories = state.categories.filter((item) => item.id != action.payload)
      state.categories = filterCategories
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload
      const foundCategory = state.categories.find((item) => item.id === id)
      if (foundCategory) {
        foundCategory.name = name
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || 'Error'
      })
  }
})

export const { deleteCategory, addCategory, updateCategory } = categorySlice.actions
export default categorySlice.reducer
