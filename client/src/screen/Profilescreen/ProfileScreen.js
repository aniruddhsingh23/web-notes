import React, { useState, useEffect } from "react";
import Mainscreen from "./../../component/Mainscreen";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import LoaderSpinner from "../../component/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "./../../component/Errorhandler/ErrorHandler";
import { userUpdate } from "../../Action/userAction";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [picmessage, setPicmessage] = useState();

  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const userlogin = useSelector((state) => state.userLogin);
  const { userInfo } = userlogin;

  const userupdate = useSelector((state) => state.userUpdate);
  const { Loader, error, success } = userupdate;

  useEffect(() => {
    if (!userInfo) {
      Navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
      console.log(pic);
    }
  }, [Navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(userUpdate({ name, email, password, pic }));
  };

  return (
    <Mainscreen title="EDIT PROFILE">
      <div>
        <Row className="profile">
          <Col md={6}>
            <Form
              style={{ width: "400px" }}
              onSubmit={submitHandler}
              enctype="multipart/form-data"
            >
              {Loader && <LoaderSpinner />}
              {success && (
                <ErrorHandler variant="success">
                  Updated Successfully
                </ErrorHandler>
              )}
              {error && <ErrorHandler variant="danger">{error}</ErrorHandler>}
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPssword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </Form.Group>
              {picmessage && (
                <ErrorHandler variant="danger">{picmessage}</ErrorHandler>
              )}
              <Form.Group className="mb-3" controlId="formFile">
                <Form.Label> Change Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  Label="Upload Profile Picture"
                  name="profile"
                  custom
                  onChange={(e) => setPic(e.target.files[0].name)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={pic}
              alt={name}
              style={{ width: "80%" }}
              className="profilePic"
            />
          </Col>
        </Row>
      </div>
    </Mainscreen>
  );
};

export default ProfileScreen;
