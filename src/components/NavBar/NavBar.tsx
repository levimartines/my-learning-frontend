import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../../assets/nav_logo.svg';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Brand as={NavLink} to="/">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/task">Tasks</Nav.Link>
          <Nav.Link as={NavLink} to="/test">Test</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;