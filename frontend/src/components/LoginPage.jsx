import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext.jsx';
import LoginForm from './login/LoginForm.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { state } = useLocation();
  const redirectTo = state ? state.from.pathname : '/';
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  return (
    <Row className="d-flex align-items-center justify-content-center h-100">
      <Col col={12} xs={12} md={6}>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={6}>
                <img src="" alt="" />
              </Col>
              <Col xs={6}>
                <LoginForm />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-center">
              <span>{t('registration.prompt')}</span>
              <Link to="/signup">{t('registration.registration')}</Link>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
export default LoginPage;
