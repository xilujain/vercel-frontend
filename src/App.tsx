import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from './redux/store'
import BaseRoute from './routes/base_routes'
import { fetchProduct } from './redux/slices/products/productSlice'
import { fetchUsers } from './redux/slices/users/userSlice'
import { fetchCategories } from './redux/slices/categories/categorySlice'

import './App.css'
import { fetchOrder } from './redux/slices/orders/orderSlice'

function App() {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduct())
    dispatch(fetchUsers())
    dispatch(fetchCategories())
    dispatch(fetchOrder())
  })
  return <BaseRoute />
}

export default App
