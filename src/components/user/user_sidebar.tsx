import useUserState from '../../hooks/useUserState'
import { Container, Nav, Navbar } from 'react-bootstrap'

const UserdSidebar = () => {
  const { userData } = useUserState()

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className="filter-section">
        <Container>
          <Nav className="me-auto" defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
              <Nav.Link href="#" className="nav-link" disabled>
                {`${userData?.firstName} ${userData?.lastName}`}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/dashboard/user/profile" className="nav-link">
                Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/dashboard/user/orders" className="nav-link">
                Orders
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default UserdSidebar
