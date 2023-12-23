import { useRef } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const dispatch = useDispatch();

  const email = emailRef.current.value;
  const password = passwordRef.current.value;

  const submitHandler = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          alert("login success");
          console.log(data.idToken);
          console.log(data.email);
          dispatch(
            authActions.login({ token: data.idToken, email: data.email })
          );
          navigate("/header");
        });
      } else {
        alert("login failed");
      }
    });
  };

  const signupHandler = (event) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <div>
      <Container
        className="m-3"
        style={{ position: "absolute", left: "40%", top: "15%" }}
      >
        <Row>
          <Col sm={4}>
            <Card>
              <Card.Header
                className="p-3"
                style={{ backgroundColor: "black", color: "white" }}
              >
                <h3>Login</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
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
                    <Button type="submit">Login</Button>
                  </Form.Group>
                </Form>
                <Form.Group>
                  <Button variant="link" onClick={signupHandler}>
                    Don't have an account? Signup
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

export default Login;
