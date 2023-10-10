import React from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../Action/userAction";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const LogoutHandler = () => {
    dispatch(Logout());
    navigate("/");
  };
  return (
    <Navbar className=".pe-5" bg="primary" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          style={{ justifyContent: "spaceBetween" }}
          id="navbarScroll"
        >
          <Nav
            style={{
              paddingLeft: "100px",
              margin: "initial",
              paddingRight: "100px",
              cursor: "pointer",
            }}
          >
            <Navbar.Brand className="">NOTE ZIPPER</Navbar.Brand>
          </Nav>
          {userInfo ? (
            <Nav>
              <Form inline>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </Nav>
          ) : (
            ""
          )}
          {userInfo ? (
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/mynotes">My Notes</Nav.Link>

              <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => LogoutHandler()}>
                  logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav
              style={{
                paddingRight: "100px",
              }}
            >
              <Navbar.Brand href="/login" className="">
                login
              </Navbar.Brand>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
