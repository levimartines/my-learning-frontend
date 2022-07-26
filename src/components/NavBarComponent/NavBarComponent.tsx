import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavBarComponent() {
  return (
    <Navbar variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/task">Tasks</Nav.Link>
          <Nav.Link as={NavLink} to="/test">Test</Nav.Link>
          <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
