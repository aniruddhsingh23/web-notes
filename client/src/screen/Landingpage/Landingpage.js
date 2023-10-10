import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";

import "./Landingpage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Landingpage = () => {
  const navigate = useNavigate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (userInfo) {
    console.log(userInfo);
    navigate("/mynotes");
  }

  // useEffect(() => {
  //   if (userInfo) {
  //     console.log(userInfo);
  //     // navigate("/");
  //   }
  // }, [userInfo]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="text-col ">
            <div>
              <h1 className="title">
                Welcome to Note <br /> Zipper
              </h1>
              <p className="sub-title">One Safe Place for all your notes.</p>
            </div>
            <div className="button-click ">
              <a href="/login">
                <Button>login</Button>
              </a>
              <a href="/register">
                <Button>Signup</Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Landingpage;
