import { Navbar, Nav, Container, NavItem } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "../components/css/Navigation.module.css";

const Navigation = () => {
  const router = useRouter();

  return (
    <Navbar
      className="navbar-custom"
      variant="dark"
      expand="lg"
      fixed="top"
      style={{ backgroundColor: '#0E0E2F' }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavItem>
              <Nav.Link
                href="/"
                className={`nav-link text-white ${router.pathname === "/" ? styles.active : ""}`}
              >
                UnderHost
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                href="/user/plans"
                className={`nav-link text-white ${router.pathname === "/user/plans" ? styles.active : ""}`}
              >
                Hospedagem/VPS
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                href="/user/plans/gameservers"
                className={`nav-link text-white ${router.pathname === "/user/plans/gameservers" ? styles.active : ""}`}
              >
                Servidores de jogos
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                href="/user/login"
                className={`nav-link text-white ${router.pathname === "/user/login" ? styles.active : ""}`}
              >
                Login
              </Nav.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
