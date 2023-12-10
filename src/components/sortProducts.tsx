import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { sortProducts } from '../redux/slices/products/productSlice'
import { Form } from 'react-bootstrap'

const SortProducts = () => {
  const dispatch: AppDispatch = useDispatch()
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value
    dispatch(sortProducts(sortValue))
  }

  return (
    <>
      <Form.Select aria-label="Default select example" onChange={handleSortChange}>
        <option value="label" defaultValue="price">
          Sort by
        </option>
        <option value="price" defaultValue="price">
          price
        </option>
        <option value="name">name</option>
      </Form.Select>
    </>
  )
}

export default SortProducts
