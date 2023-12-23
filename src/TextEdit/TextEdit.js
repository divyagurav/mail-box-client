import { useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { inboxActions } from "../store/inboxSlice";

//import { EditorState } from "draft-js";

const TextEdit = () => {
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const textAreaRef = useRef("");
  const dispatch = useDispatch();

  const fetchEmail = localStorage.getItem("email").replace(/[@.]/g, "");
  //localStorage.setItem("emailId", emailRef.current.value);
  // const recieverEmail = localStorage.getItem("emailId").replace(/[@.]/g, "");

  dispatch(inboxActions.setUnread());

  const submitHandler = (event) => {
    const email = emailRef.current.value;
    const subject = subjectRef.current.value;
    const textArea = textAreaRef.current.value;
    const enteredEmail = email.replace(/[@.]/g, "");
    localStorage.setItem("emailId", email);
    event.preventDefault();
    const data = {
      email,
      subject,
      textArea,
    };

    fetch(
      `https://profile-8d013-default-rtdb.firebaseio.com/${fetchEmail}/sent.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        const values = res.json();
        console.log(values);
        alert("send  data to sent");
      }
    });
    fetch(
      `https://profile-8d013-default-rtdb.firebaseio.com/${enteredEmail}/inbox.json`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          subject,
          textArea,
          read: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("sent to inbox");
      }
    });

    //else {
    //   fetch(
    //     `https://profile-8d013-default-rtdb.firebaseio.com/${fetchEmail}/sent.json`,
    //     {
    //       method: "POST",
    //       body: JSON.stringify(data),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   ).then((res) => {
    //     if (res.ok) {
    //       const values = res.json();
    //       console.log(values);
    //       alert("send  data to sent");
    //     }
    //   });

    //   fetch(
    //     `https://profile-8d013-default-rtdb.firebaseio.com/${recieverEmail}/inbox.json`,
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         email,
    //         subject,
    //         textArea,
    //         read: true,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   ).then((res) => {
    //     if (res.ok) {
    //       alert("sent to inbox");
    //     }
    //   });
    // }
  };

  return (
    <div>
      <Container className="mt-5 bg-secondary pb-4 ps-0" fluid>
        <Row>
          <Col sm={8} style={{ margin: "auto" }}>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Subject"
                  ref={subjectRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control as="textarea" rows={13} ref={textAreaRef} />
                <Button
                  type="submit"
                  style={{ position: "absolute", left: "45%", top: "90%" }}
                >
                  Send
                </Button>
              </Form.Group>
              <Editor
                //editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                // onEditorStateChange={onEditorStateChange}
              />
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TextEdit;
