// Admin page

import { useDispatch } from 'react-redux'
import AdminSidebar from '../../components/admin/admin_sidebar'
import { AppDispatch } from '../../redux/store'
import useUserState from '../../hooks/useUserState'
import { ChangeEvent, FormEvent, useState } from 'react'
import { updateUser } from '../../redux/slices/users/userSlice'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch()

  const { userData } = useUserState()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })
  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }
  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault
    const updateUserData = { id: userData?.id, ...user }
    dispatch(updateUser(updateUserData))
  }

  return (
    <div className="container">
      <AdminSidebar />

      {userData && (
        <>
          <Card style={{ marginTop: '2rem' }}>
            <Card.Body>
              <Card.Title>Full name: {`${userData.firstName} ${userData.lastName}`}</Card.Title>
              <Card.Text>Email: {userData.email}</Card.Text>
              <Card.Text>Role: {userData.role}</Card.Text>
              <Card.Link onClick={handleFormOpen}>Edit profile</Card.Link>
            </Card.Body>
          </Card>
          {isFormOpen && (
            <Container className="form-validation">
              <Form onSubmit={handleSubmit}>
                <Row xs={1} md={2}>
                  <Col>
                    <Form.Group>
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleUserChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleUserChange}
                      />
                    </Form.Group>
                  </Col>
                  <Button variant="primary" type="submit">
                    Update the profile
                  </Button>
                </Row>
              </Form>
            </Container>
          )}
        </>
      )}
    </div>
  )
}

export default AdminPage
