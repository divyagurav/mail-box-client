import React, { useRef } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmRef = useRef("");

  const submithandler = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmpassword = confirmRef.current.value;

    if (password === confirmpassword) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          alert("signup success");
        } else {
          alert("signup failed");
        }
      });
    } else {
      alert("incorrect password");
    }
  };
  const loginHandler = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  return (
    <div>
      <Container
        className="m-3"
        style={{ position: "absolute", left: "40%", top: "15%" }}
      >
        <Row>
          <Col sm={4}>
            <Card className="shadow-lg">
              <Card.Header
                className="p-3"
                style={{ backgroundColor: "black", color: "white" }}
              >
                <h3> SignUp</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submithandler}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      ref={emailRef}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      ref={passwordRef}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      ref={confirmRef}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Button type="submit">SignUp</Button>
                  </Form.Group>
                </Form>
                <Form.Group>
                  <Button variant="link" onClick={loginHandler}>
                    already have an account? Login{" "}
                  </Button>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
