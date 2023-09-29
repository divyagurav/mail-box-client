import { useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.css";
import { Row, Col, Container, Card, Button, Form } from "react-bootstrap";

const TextEditor = () => {
  const emailRef = useRef();
  const subjectRef = useRef();
  const textRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const mailObj = {
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      text: textRef.current.value,
    };
    let emailId = mailObj.email.replace(/[&@.]/g, "");

    fetch(`https://profile-8d013-default-rtdb.firebaseio.com/${emailId}.json`, {
      method: "POST",
      body: JSON.stringify(mailObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        alert("store success");
      } else {
        alert("failed");
      }
    });
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form className="pt-4" onSubmit={submitHandler}>
              <Card style={{ width: "50rem" }} border="success">
                <Card.Header>
                  <h3>welcome </h3>
                </Card.Header>
                <Card.Body className="colours">
                  {/* <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      ref={emailRef}
                    />
                  </InputGroup> */}
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      size="sm"
                      type="email"
                      placeholder="Enter email"
                      ref={emailRef}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="subject">
                    <Form.Label>subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter subject"
                      ref={subjectRef}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="message">
                    <Form.Label>message</Form.Label>
                    <Form.Control as="textarea" rows={5} ref={textRef} />
                  </Form.Group>
                </Card.Body>

                <Card.Footer>
                  <Editor
                    // editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    // onEditorStateChange={updateTextDescription}
                  />
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TextEditor;
