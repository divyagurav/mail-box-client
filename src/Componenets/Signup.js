import { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      alert("invalid Password");
    }

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormsg = data.error.message;
            throw new Error(errormsg);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
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
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      ref={confirmPasswordRef}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Button type="Submit">
                      {" "}
                      {isLogin ? "Login" : "Signup"}
                    </Button>
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
