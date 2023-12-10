import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{ paddingBottom: '4em', fontSize: '0.8rem' }}>
      <Container>
        <Row>
          <Col>
            <img src="src/assets/images/computer.png" alt="" style={{ width: '20%' }} />
          </Col>
        </Row>
        <Row md={5}>
          <Col>Company</Col>
          <Col>About us</Col>
          <Col>Why choose us</Col>
          <Col>Pricing</Col>
          <Col>Testimonial</Col>
        </Row>
        <Row md={5}>
          <Col>Resources</Col>
          <Col>Privacy policy</Col>
          <Col>Terms and condition</Col>
          <Col>Blog</Col>
          <Col>Contact us</Col>
        </Row>
        <Row md={5}>
          <Col>Product</Col>
          <Col>Project management</Col>
          <Col>Time tracker</Col>
          <Col>Time schedule</Col>
          <Col>Lead generate</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
