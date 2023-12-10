import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categoryReducer from './slices/categories/categorySlice'
import userReducer from './slices/users/userSlice'
import orderReduser from './slices/orders/orderSlice'
import cartReduser from './slices/cart/cartSlice'

export const store = configureStore({
  reducer: {
    productsReduser: productsReducer,
    categoriesReducer: categoryReducer,
    usersReduser: userReducer,
    orderReduser: orderReduser,
    cartReduser: cartReduser
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
