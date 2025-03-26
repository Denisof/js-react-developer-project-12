import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigate } from 'react-router-dom';
import SignUpForm from './login/SignUpForm.jsx';
import { useAuth } from './AuthContext.jsx';

const SignUpPage = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <Row className="d-flex align-items-center justify-content-center h-100">
      <Col col="12" xs="12" md="6">
        <Card>
          <Card.Body>
            <Row>
              <Col xs="6">
                <img src="" alt="" />
              </Col>
              <Col xs="6">
                <SignUpForm />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default SignUpPage;
