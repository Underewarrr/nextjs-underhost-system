import { Navbar, Nav, Container, NavItem } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "../components/css/Navigation.module.css";

const Navigation = () => {
  const router = useRouter();

  return (
    <Navbar
      className={"navbar-custom"}
      variant="dark"
      expand="lg"
      fixed="top"
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
                Home
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                href="/about"
                className={`nav-link text-white ${router.pathname === "/about" ? styles.active : ""}`}
              >
                Download
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                href="/about"
                className={`nav-link text-white ${router.pathname === "/about" ? styles.active : ""}`}
              >
                Pokedex
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                href="/about"
                className={`nav-link text-white ${router.pathname === "/about" ? styles.active : ""}`}
              >
                Wiki
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
