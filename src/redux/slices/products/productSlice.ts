import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
export const fetchProduct = createAsyncThunk('product/fetchProduct', async () => {
  const response = await api.get('/mock/e-commerce/products.json')
  return response.data
})

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  singleProduct: Product
  searchTerm: string
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  singleProduct: {} as Product,
  searchTerm: ''
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.items.find((product) => product.id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      if (sortingCriteria === 'name') {
        state.items.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortingCriteria === 'price') {
        state.items.sort((a, b) => a.price - b.price)
      }
    },
    deleteProduct: (state, action) => {
      const filterCategories = state.items.filter((item) => item.id != action.payload)
      state.items = filterCategories
    },
    updateProduct: (state, action) => {
      const { id, product } = action.payload
      const updateProduct = state.items.map((singleProduct) => {
        if (singleProduct.id === id) {
          return { ...singleProduct, ...product }
        }
        return singleProduct
      })
      state.items = updateProduct
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.error.message || 'Error'
      })
  }
})

export const { findProductById, searchProduct, sortProducts, deleteProduct, updateProduct } =
  productSlice.actions
export default productSlice.reducer
