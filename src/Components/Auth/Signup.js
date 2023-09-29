import { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth-reducer";

const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          alert("login success");
          const data = res.json();
          dispatch(
            authActions.login({
              token: data.idToken,
              email: data.email,
            })
          );
          navigate("/text");
        } else {
          alert("login failed");
        }
      });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          console.log("User has successfully signed up.");
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;
            alert(errorMessage);
          });
        }
      });
    }
  };

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  return (
    <div>
      <Container fluid style={{ marginLeft: "550px", marginTop: "140px" }}>
        <Row>
          <Col xs={3}>
            <Card className="shadow-lg ml-5">
              <Card.Header className="p-3">
                <h1>{isLogin ? "Login" : "SignUp"}</h1>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Email Id"
                      ref={emailInputRef}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      ref={passwordInputRef}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Button type="Submit">
                      {" "}
                      {isLogin ? "Login" : "Signup"}
                    </Button>
                  </Form.Group>
                  <Form.Group>
                    {isLogin ? <a href="#">Forgot password</a> : ""}
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Button className="mt-3 w-40 bg-secondary" onClick={switchHandler}>
        {isLogin ? "Dont have an account? Signup" : "Have an account? Login"}
      </Button>
    </div>
  );
};

export default Signup;
