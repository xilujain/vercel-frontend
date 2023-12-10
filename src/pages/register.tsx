import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { addUser, fetchUsers } from '../redux/slices/users/userSlice'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const Register = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    ban: false
  })

  const [firstNameError, setFirstNameError] = useState('')
  const handelInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const newUser = { id: new Date().getTime(), ...user }
      if (user.firstName.length < 2) {
        setFirstNameError('first name must be at least 2 characters')
        return
      }
      dispatch(fetchUsers()).then(() => dispatch(addUser(newUser)))
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  // Implement register functionality via email and password
  return (
    <Container className="form-validation">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="fname">First name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handelInputChange}
            required
          />
          <p>{firstNameError}</p>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="lname">Last name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handelInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            value={user.email}
            placeholder="Enter email"
            onChange={handelInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={user.password}
            placeholder="Enter password"
            onChange={handelInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Register
