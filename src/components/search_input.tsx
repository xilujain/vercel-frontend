import { ChangeEvent } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

type searchInputProps = {
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ searchTerm, handleSearch }: searchInputProps) => {
  return (
    <>
      <Form>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default SearchInput
