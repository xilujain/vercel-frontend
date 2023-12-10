import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Product, deleteProduct, updateProduct } from '../../redux/slices/products/productSlice'
import AdminSidebar from './admin_sidebar'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import useProductState from '../../hooks/useProductState'
import { Col, Container, Form, Row } from 'react-bootstrap'

const Products = () => {
  const dispatch: AppDispatch = useDispatch()

  const { isLoading, error, items } = useProductState()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [product, setProduct] = useState({
    name: '',
    price: 0
  })
  const [selectedProduct, setIsSelectedProduct] = useState<number>(0)

  const handleFormOpen = (id: number, product: Product) => {
    setIsFormOpen(!isFormOpen)
    setProduct(product)
    setIsSelectedProduct(id)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault
    dispatch(updateProduct({ id: selectedProduct, product: product }))
    setIsFormOpen(false)
    setIsSelectedProduct(0)
  }

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id))
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
      <Card style={{ width: '30rem' }}>
        {items.map((item) => {
          return (
            <>
              <Card style={{ margin: '2rem' }} key={item.id}>
                <Card.Body>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text style={{ color: 'rgb(86, 86, 255)' }}>${item.price}</Card.Text>
                  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button variant="primary" onClick={() => handleFormOpen(item.id, item)}>
                      Edit
                    </Button>
                    {/* remove a product */}
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
              {isFormOpen && selectedProduct === item.id ? (
                <Container className="form-validation">
                  <Form onSubmit={handleSubmit}>
                    <Row xs={1} md={2}>
                      <Col>
                        <Form.Group>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={(event) =>
                              setProduct({ ...product, name: event.target.value })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="text"
                            name="price"
                            value={product.price}
                            onChange={(event) =>
                              setProduct({ ...product, price: Number(event.target.value) })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Button variant="primary" type="submit">
                        Update the product
                      </Button>
                    </Row>
                  </Form>
                </Container>
              ) : (
                <div></div>
              )}
            </>
          )
        })}
      </Card>
    </>
  )
}

export default Products
