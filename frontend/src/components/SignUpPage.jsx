import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SignUpForm from './login/SignUpForm.jsx';

export default function SignUpPage() {
  return (
    <Row className="d-flex align-items-center justify-content-center h-100">
      <Col col={12} xs={12} md={6} >
        <Card>
          <Card.Body>
            <Row>
              <Col xs={6}>
                <img src="" alt="Image"/>
              </Col>
              <Col xs={6}>
                <SignUpForm/>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
