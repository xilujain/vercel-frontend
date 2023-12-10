import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchUsers, login } from '../../redux/slices/users/userSlice'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import './login.css'

const Login = ({ pathName }: { pathName: string }) => {
  const { items } = useSelector((state: RootState) => state.usersReduser)
  const dispatch: AppDispatch = useDispatch()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  const navigate = useNavigate()
  const handelInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      const { value, name } = event.target
      return { ...prevState, [name]: value }
    })
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const foundUser = items.find((userData) => userData.email === user.email)
      if (!foundUser) {
        console.log('user not found with this email')
        return
      }
      if (foundUser.password !== user.password) {
        console.log('user password does not match')
        return
      }
      if (foundUser.ban) {
        console.log('Sorry you are banned')
        return
      }
      dispatch(login(foundUser))
      navigate(pathName ? pathName : `/dashboard/${foundUser.role}`)
    } catch (error) {
      console.log(error)
    }
    setUser({
      email: '',
      password: ''
    })
  }

  // Implement login functionality via email and password
  return (
    <Container className="form-validation">
      <Form onSubmit={handleSubmit}>
        <Row xs={1} md={2}>
          <Col>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                value={user.email}
                placeholder="Enter email"
                onChange={handelInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                value={user.password}
                placeholder="Enter password"
                onChange={handelInputChange}
              />
            </Form.Group>
          </Col>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  )
}

export default Login
