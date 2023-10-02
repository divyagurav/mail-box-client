import { FloatingLabel, Form, FormControl, Button, Nav } from "react-bootstrap";
import classes from "./signup.module.css";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

const SignupDetails = () => {
  const emailInpurRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInpurRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmpassword = confirmpasswordInputRef.current.value;

    if (enteredPassword !== confirmpassword) {
      alert("Password and confirm password must match");
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD61trb_TQ27ZLrT4ybyyFKWkht-DaUa0o",
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
          console.log("successfully signed up");
          alert("Account created succesful");
        } else {
          return res.json().then((data) => {
            // console.log(data);
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            alert(errorMessage);
          });
        }
      });
    }
    emailInpurRef.current.value = "";
    passwordInputRef.current.value = "";
    confirmpasswordInputRef.current.value = "";
  };

  return (
    <>
      <div className={classes.signup}>
        <h1>Sign up</h1>
        <Form onSubmit={submitHandler}>
          <FloatingLabel label="Email address" className="mb-3">
            <FormControl
              type="text"
              placeholder="Username"
              required
              ref={emailInpurRef}
            />
          </FloatingLabel>
          <FloatingLabel label="Password" className="mb-3">
            <FormControl
              type="password"
              placeholder="Username"
              required
              ref={passwordInputRef}
            />
          </FloatingLabel>
          <FloatingLabel label="Confirm Password" className="mb-3">
            <FormControl
              type="password"
              placeholder="Username"
              required
              ref={confirmpasswordInputRef}
            />
          </FloatingLabel>
          <div className="d-grid">
            <Button type="submit" style={{ borderRadius: "5rem" }}>
              Sign up
            </Button>
          </div> 
          <div className={classes.h2}>
          <NavLink to={"/login"}>Have an account?</NavLink>
      </div>
        </Form>
      </div>
     
    </>
  );
};
export default SignupDetails;
