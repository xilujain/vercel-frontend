import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { removeAllFromCart, removeFromCart } from '../redux/slices/cart/cartSlice'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReduser)

  const dispatch: AppDispatch = useDispatch()
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id))
  }
  const handleRemoveAllItems = () => {
    dispatch(removeAllFromCart())
  }

  return (
    <>
      <Row className="card-items">
        <Col className="title">
          you have {cartItems.length > 0 ? cartItems.length : 0} items in the cart
        </Col>
        {cartItems.length > 0 && (
          <div className="btns">
            <Button variant="danger" onClick={handleRemoveAllItems}>
              Remove all the items
            </Button>
          </div>
        )}
        {cartItems.length > 0 &&
          cartItems.map((item) => {
            return (
              <>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>{item.price}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    {/* Remove products from a cart */}
                    <Card.Link
                      onClick={() => {
                        handleRemoveFromCart(item.id)
                      }}>
                      Delete
                    </Card.Link>
                  </Card.Body>
                </Card>
              </>
            )
          })}
      </Row>
    </>
  )
}

export default Cart
