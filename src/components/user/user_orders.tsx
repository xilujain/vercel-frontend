import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { deleteOrder } from '../../redux/slices/orders/orderSlice'
import Card from 'react-bootstrap/Card'
import AdminSidebar from '../admin/admin_sidebar'
import useOrderState from '../../hooks/useOrderState'
import { Button, ListGroup } from 'react-bootstrap'

const UserOrders = () => {
  const { orders, isLoading, error } = useOrderState()

  const dispatch: AppDispatch = useDispatch()
  const handleDelete = (id: number) => {
    dispatch(deleteOrder(id))
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
      <ListGroup as="ol">
        {orders.length > 0 &&
          orders.map((order) => {
            return (
              <>
                {/* list all orders */}
                <Card style={{ margin: '2rem' }}>
                  <Card.Body
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '1rem'
                    }}>
                    <Card.Header>product id: {order.id}</Card.Header>
                    <Card.Title>product purchased: {order.purchasedAt}</Card.Title>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDelete(order.id)
                      }}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </>
            )
          })}
      </ListGroup>
    </>
  )
}

export default UserOrders
