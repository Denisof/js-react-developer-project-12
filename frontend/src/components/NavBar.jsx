import {
  Navbar,
  Nav,
  Button,
  Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext.jsx';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar id="nav-bar" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">{t('chat.title')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated && (
              <Button variant="primary" onClick={() => logout()}>{t('chat.buttons.logout')}</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
