// Home page (list all the products)

import { ChangeEvent, useState } from 'react'
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Col,
  Container,
  Form,
  Row
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Product, searchProduct } from '../../redux/slices/products/productSlice'
import { Link } from 'react-router-dom'
import SearchInput from '../../components/search_input'
import useCategoryState from '../../hooks/useCategoryState'
import { prices } from '../../price'
import { addToCart } from '../../redux/slices/cart/cartSlice'
import useProductState from '../../hooks/useProductState'
import './home.css'
import SortProducts from '../../components/sortProducts'

const Home = () => {
  const [checkedCategories, setCheckedCategories] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)

  const { items, isLoading, error, searchTerm } = useProductState()
  const { categories } = useCategoryState()

  const dispatch: AppDispatch = useDispatch()
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    dispatch(searchProduct(searchValue))
  }

  const handleCheckedCategory = (categoryId: number) => {
    if (checkedCategories.includes(categoryId)) {
      const removeCategory = checkedCategories.filter((category) => category !== categoryId)
      setCheckedCategories(removeCategory)
    } else {
      setCheckedCategories((prevState) => {
        return [...prevState, categoryId]
      })
    }
  }

  const handlePriceChange = (priceId: number) => {
    const findPriceId = prices.find((price) => price.id === priceId)
    if (findPriceId) {
      setPriceRange(findPriceId.range)
    }
  }

  const filterproduct = items.filter((product) => {
    const categoryMatch =
      checkedCategories.length > 0
        ? checkedCategories.some((id) => product.categories.includes(Number(id)))
        : product
    const priceMatch =
      priceRange.length > 0
        ? product.price >= priceRange[0] && product.price <= priceRange[1]
        : product
    const searchMatch =
      searchTerm !== '' ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : items
    return categoryMatch && priceMatch && searchMatch
  })

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItem = filterproduct.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filterproduct.length / itemsPerPage)
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const handlePageChange = (index: number) => {
    setCurrentPage(index)
  }
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const buttonElements = []
  for (let i = 2; i <= totalPages - 1; i++) {
    buttonElements.push(<Button onClick={() => handlePageChange(i)}></Button>)
  }

  if (isLoading) {
    return <p>Loading....</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <>
      <Container fluid>
        <Row className="onboard-home">
          <Col>
            <img src="src/assets/images/computer.png" alt="" />
          </Col>
          <Col className="title">Work that we produce for our Costumer</Col>
        </Row>

        {/* Search products by name */}
        <Row className="onboard-home">
          <Col>
            <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
          </Col>
          <Col>
            <SortProducts />
          </Col>
        </Row>

        <div className="main-filter">
          <Container className="filter" fluid>
            <ButtonGroup>
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <>
                      {/* Filter products by Categories */}
                      <div className="filter-section">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            handleCheckedCategory(category.id)
                          }}>
                          {category.name}
                        </Button>
                      </div>
                    </>
                  )
                })}
            </ButtonGroup>

            {/* Filter products by price */}
            <Row className="filter-price">
              <Col className="title">Filter by price</Col>
              {prices.length > 0 &&
                prices.map((price) => {
                  return (
                    <div key={price.id} className="price-type">
                      <Form.Check
                        type="radio"
                        name="price"
                        aria-label="radio 1"
                        value={price.id}
                        onChange={() => {
                          handlePriceChange(price.id)
                        }}
                      />
                      <label htmlFor="">{price.name}</label>
                    </div>
                  )
                })}
            </Row>
          </Container>
        </div>

        <Row className="card-items">
          {currentItem.length > 0 &&
            currentItem.map((item) => {
              return (
                <>
                  {/* Get list of products */}
                  <Card style={{ width: '18rem' }} className="card">
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text style={{ color: 'rgb(86, 86, 255)' }}>${item.price}</Card.Text>
                      <div className="btns">
                        {/* Add products to a cart */}
                        <Button
                          variant="primary"
                          onClick={() => {
                            handleAddToCart(item)
                          }}>
                          Add to cart
                        </Button>
                        <Link to={`/products/${item.id}`} style={{ marginLeft: '2rem' }}>
                          Show details
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              )
            })}
        </Row>

        {/* Implement pagination feature */}
        <Row className="pagination">
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="First group">
              <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </Button>
              <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
      </Container>
    </>
  )
}

export default Home
