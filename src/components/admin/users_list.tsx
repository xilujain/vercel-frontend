import { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { banUser, deleteUser, fetchUsers, searchUser } from '../../redux/slices/users/userSlice'
import AdminSidebar from './admin_sidebar'
import ListGroup from 'react-bootstrap/ListGroup'
import useUserState from '../../hooks/useUserState'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const UsersList = () => {
  const { items, isLoading, error, searchTerm } = useUserState()
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUser(event.target.value))
  }
  const userSearch = searchTerm
    ? items.filter((item) => item.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
    : items
  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
  }
  const handleBan = (id: number) => {
    dispatch(banUser(id))
  }
  if (isLoading) {
    return <p>Loading....</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <AdminSidebar />
      <div>
        <Form>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="category"
                placeholder="Search"
                onChange={handleSearch}
                style={{ width: '50rem', marginLeft: '2rem' }}
              />
            </Col>
          </Row>
        </Form>
      </div>
      <ListGroup as="ol">
        {userSearch.length > 0 &&
          userSearch.map((item) => {
            if (item.role !== 'admin') {
              return (
                // list all users.
                <>
                  <Card style={{ margin: '2rem' }}>
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '1rem'
                      }}>
                      <Card.Header>{`${item.firstName} ${item.lastName}`}</Card.Header>
                      <Card.Title>{item.email}</Card.Title>
                      <Card.Title>{item.role}</Card.Title>
                      <div>
                        {/* block a user. */}
                        <Button
                          variant="warning"
                          onClick={() => {
                            handleBan(item.id)
                          }}>
                          {item.ban ? 'unbanned' : 'banned'}
                        </Button>
                        {/* delete a user. */}
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleDelete(item.id)
                          }}>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              )
            }
          })}
      </ListGroup>
    </>
  )
}

export default UsersList
