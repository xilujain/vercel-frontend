import { Container, Nav, Navbar } from 'react-bootstrap'

const AdminSidebar = () => {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className="filter-section">
        <Container>
          <Nav className="me-auto" defaultActiveKey="/home" as="ul">
            <Nav.Item>
              <Nav.Link href="/dashboard/admin/category" className="nav-link">
                Category
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/dashboard/admin/products" className="nav-link">
                Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/dashboard/admin/users-list" className="nav-link">
                Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/dashboard/admin/orders" className="nav-link">
                Orders
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default AdminSidebar
