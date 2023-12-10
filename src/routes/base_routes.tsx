import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/home'
import AdminPage from '../pages/admin/admin_page'
import Category from '../components/admin/category'
import Products from '../components/admin/products'
import ProductDetails from '../pages/product_details'
import UserPage from '../pages/user/user_page'
import NavBar from '../components/layouts/navbar'
import Footer from '../components/layouts/footer'
import UserOrders from '../components/user/user_orders'
import UserProfile from '../pages/user/user_profile'
import Login from '../pages/login/login'
import UsersList from '../components/admin/users_list'
import ProtectedRoute from './protected_route'
import AdminRoute from './admin_route'
import Register from '../pages/register'
import Cart from '../pages/cart'

const BaseRoute = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/product-detail" element={<ProductDetails />} />
        <Route path="/login" element={<Login pathName={''} />} />
        <Route path="/logout" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        {/* ///////////////////////////////////////// */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<UserPage />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>
        {/* ///////////////////////////////////////// */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/category" element={<Category />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users-list" element={<UsersList />} />
          <Route path="admin/orders" element={<UserOrders />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default BaseRoute
