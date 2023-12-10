import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import {
  addCategory,
  deleteCategory,
  updateCategory
} from '../../redux/slices/categories/categorySlice'
import AdminSidebar from './admin_sidebar'
import Card from 'react-bootstrap/Card'
import useCategoryState from '../../hooks/useCategoryState'
import { Col, Row, Form, Button } from 'react-bootstrap'

const Category = () => {
  const { categories, isLoading, error } = useCategoryState()
  const [categoryName, setCategoryName] = useState('')
  const [isEditCategory, setIsEditCategory] = useState(false)
  const [isCategoryId, setIsCategoryId] = useState(0)

  const dispatch: AppDispatch = useDispatch()
  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id))
  }
  const handleEdit = (id: number, name: string) => {
    setIsCategoryId(id)
    setIsEditCategory(true)
    setCategoryName(name)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!isEditCategory) {
      const newCategory = {
        id: new Date().getTime(),
        name: categoryName
      }
      dispatch(addCategory(newCategory))
    } else {
      const update = {
        id: isCategoryId,
        name: categoryName
      }
      dispatch(updateCategory(update))
    }

    setCategoryName('')
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
      <Card>
        <Card.Body>
          {/* Add a new category */}
          <h3 className="title">Create a category</h3>
          <div>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    name="category"
                    placeholder="Search"
                    value={categoryName}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Button type="submit">{isEditCategory ? 'Update' : 'Create'}</Button>
                </Col>
              </Row>
            </Form>
          </div>
          {/* update info of a category */}
          {categories &&
            categories.map((category) => {
              return (
                <>
                  <Card style={{ margin: '2rem' }}>
                    <Card.Body style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                      <Card.Title>{category.name}</Card.Title>
                      <Card.Link
                        href="#"
                        onClick={() => {
                          handleEdit(category.id, category.name)
                        }}>
                        Edit
                      </Card.Link>
                      {/* remove a category */}
                      <Card.Link
                        href="#"
                        onClick={() => {
                          handleDelete(category.id)
                        }}>
                        Delete
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </>
              )
            })}
        </Card.Body>
      </Card>
    </>
  )
}

export default Category
