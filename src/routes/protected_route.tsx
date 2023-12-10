// Protect the routes based on login and admin status

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet, useLocation } from 'react-router-dom'
import Login from '../pages/login/login'

const ProtectedRoute = () => {
  const location = useLocation()
  const { isLoggedIn } = useSelector((state: RootState) => state.usersReduser)

  return isLoggedIn ? <Outlet /> : <Login pathName={location.pathname} />
}

export default ProtectedRoute
