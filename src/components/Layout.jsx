import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

const Layout = () => {
  const cartProducts = useSelector((state) => state.cart);
  console.log(cartProducts);

  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary "
        style={{ position: "sticky", top: "0", zIndex: "2" }}
      >
        <Container fluid>
          <Navbar.Brand href="#">Redux Toolkit</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link to="/" as={Link}>
                Home
              </Nav.Link>
              <Nav.Link to="/products" as={Link}>
                Products
              </Nav.Link>
              <Nav.Link to="/cart" as={Link}>
                Cart {cartProducts.length}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main style={{ padding: "20px", minHeight: "80vh" }}>
        <Outlet />
      </main>
      <footer
        style={{ background: "#ddd", padding: "10px", marginTop: "20px" }}
      >
        <p>© 2025 My Website</p>
      </footer>
    </div>
  );
};

export default Layout;
