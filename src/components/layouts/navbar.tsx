import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { logout } from '../../redux/slices/users/userSlice'
import { Container, Nav, Navbar } from 'react-bootstrap'
import CartIcon from '../cart_icon'

function NavBar() {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReduser)
  const { cartItems } = useSelector((state: RootState) => state.cartReduser)

  const dispatch: AppDispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto" defaultActiveKey="/home" as="ul">
            {isLoggedIn && (
              <>
                <Nav.Item as="li">
                  <Nav.Link href="/logout" onClick={handleLogOut}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link href={`/dashboard/${userData?.role}`}>
                    {userData?.role} Dashboard
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Nav.Item as="li">
                  <Nav.Link href="/register" className="nav-link">
                    Register
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
              </>
            )}
            <Nav.Item as="li">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/cart">
                <CartIcon value={cartItems.length > 0 ? cartItems.length : 0} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
