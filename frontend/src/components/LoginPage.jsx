import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoginForm from './login/LoginForm.jsx'
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';


export default function LoginPage() {
  const { t } = useTranslation();
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
                <LoginForm/>
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
  )
}
