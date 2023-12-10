import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet, useLocation } from 'react-router-dom'
import Login from '../pages/login/login'

const AdminRoute = () => {
  const location = useLocation()
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReduser)

  return isLoggedIn && userData?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Login pathName={location.pathname} />
  )
}

export default AdminRoute
