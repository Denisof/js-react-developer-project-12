import {Navbar, Nav, Button, Container} from 'react-bootstrap';
import {useAuth} from "./AuthContext.jsx";
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const {isAuthenticated, logout} = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar id="nav-bar" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">{t('chat.title')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
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
