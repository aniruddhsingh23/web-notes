import React, { useState, useEffect } from "react";
import Mainscreen from "./../../component/Mainscreen";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import ErrorHandler from "../../component/Errorhandler/ErrorHandler";

import LoaderSpinner from "./../../component/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";

import { Register } from "./../../Action/userAction";

const Registerpage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pconfirm, setPconfirm] = useState("");
  const [pic, setPic] = useState(null);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  let { Loader, error, userInfo } = userRegister;

  useEffect(() => {
    userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      Navigate("/mynotes");
    }
  }, [userInfo, Navigate]);

  const handleFileChange = (event) => {
    setPic(event.target.files[0]);
  };

  const ChangeHandler = async (e) => {
    e.preventDefault();

    const pic = new FormData();
    pic.append("photo", pic);

    if (password !== pconfirm) {
      setMessage("Password do not Match");
    } else {
      console.log("pic", pic);
      dispatch(Register(name, email, password, pic));
    }
  };

  return (
    <Mainscreen title="REGISTER">
      {error && <ErrorHandler variant="danger">{error}</ErrorHandler>}
      {message && <ErrorHandler variant="danger">{message}</ErrorHandler>}
      {Loader && <LoaderSpinner />}
      <Container className="d-flex justify-content-center">
        <Form
          style={{ width: "400px" }}
          onSubmit={ChangeHandler}
          enctype="multipart/form-data"
        >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPssword">
            <Form.Label>Password</Form.Label>
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={pconfirm}
              onChange={(e) => setPconfirm(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              Label="Upload Profile Picture"
              name="profile"
              onChange={handleFileChange}
              // defaultValue={this.state.selectedFile}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Row className="mt-3 ">
            <Col>
              <p className=" d-flex  ">
                New Costumer ?
                <Link to="/login">
                  <spam className="text-info  " style={{ marginLeft: "10px" }}>
                    Login
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

export default Registerpage;
