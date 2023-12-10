// Product page (contain the details of a product)

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchProduct, findProductById } from '../redux/slices/products/productSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { singleProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReduser
  )
  const { categories } = useSelector((state: RootState) => state.categoriesReducer)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduct()).then(() => dispatch(findProductById(Number(id))))
  }, [])

  if (isLoading) {
    return <p>Loading....</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const getCategoryNameById = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId)
    return category ? category.name + ', ' : 'category not found'
  }

  return (
    <div>
      {singleProduct && (
        <>
          <Card style={{ width: '18rem' }} className="card">
            <Card.Img variant="top" src={singleProduct.image} />
            <Card.Body>
              <Card.Title>{singleProduct.name}</Card.Title>
              <Card.Text>{singleProduct.description}</Card.Text>
              <Card.Text style={{ color: 'rgb(86, 86, 255)' }}>${singleProduct.price}</Card.Text>
              <Card.Text style={{ color: 'rgb(86, 86, 255)' }}>
                Categories:
                {singleProduct.categories &&
                  singleProduct.categories.map((categoryId: number) =>
                    getCategoryNameById(categoryId)
                  )}
              </Card.Text>
              <Card.Text style={{ color: 'rgb(86, 86, 255)' }}>
                Size: {singleProduct.sizes && singleProduct.sizes.join(' , ')}
              </Card.Text>
              <div className="btns">
                <Button
                  onClick={() => {
                    navigate('/')
                  }}>
                  Back to shopping
                </Button>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  )
}

export default ProductDetails
