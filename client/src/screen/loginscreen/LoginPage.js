import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mainscreen from "./../../component/Mainscreen";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoaderSpinner from "./../../component/Spinner/Spinner";

import ErrorHandler from "../../component/Errorhandler/ErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../Action/userAction";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    dispatch(Login(email, password));
  };
  const userLogin = useSelector((state) => state.userLogin);
  let { Loader, error, userInfo } = userLogin;

  useEffect(() => {
    userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      Navigate("/mynotes");
    }
  }, [userInfo, Navigate]);

  return (
    <Mainscreen title="LOGIN">
      {error && <ErrorHandler variant="danger"> {error} </ErrorHandler>}
      {Loader && <LoaderSpinner />}
      <Container className="d-flex justify-content-center">
        <Form style={{ width: "400px" }} onSubmit={SubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Row className="mt-3 ">
            <Col>
              <p className=" d-flex  ">
                New Costumer ?
                <Link to="/register">
                  <spam className="text-info  " style={{ marginLeft: "10px" }}>
                    Register Here
                  </spam>
                </Link>
              </p>
            </Col>
          </Row>
        </Form>
      </Container>
    </Mainscreen>
  );
};

export default Loginpage;
