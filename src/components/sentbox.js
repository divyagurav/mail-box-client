import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Card, ListGroup, Modal } from "react-bootstrap";

const Sent = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [messages, setMessages] = useState([]);

  const email = localStorage.getItem("email");
  const sanitizedEmail = email.replace(/[@.]/g, "");

  useEffect(() => {
    axios
      .get(
        `https://react-http-76e5c-default-rtdb.firebaseio.com/${sanitizedEmail}/outbox.json`
      )
      .then((response) => {
        console.log(`logging from sent box${JSON.stringify(response.data)}`);

        if (response.data) {
          setMessages(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const setKeyToLocalStorege = (key) => {
    localStorage.setItem("key which is clicked", key);
    setSelectedEmail(messages[key]);
  };

  const handleClose = () => {
    setSelectedEmail(null);
  };
  return (
    <div>
      <div>
        <h3 style={{ color: "white" }}>Sentbox</h3>
        <Card className="text-left">
          <ListGroup variant="flush">
            {Object.keys(messages)
              .reverse()
              .map((key, index) => (
                <ListGroup.Item key={key}>
                  <div onClick={() => setKeyToLocalStorege(key)}>
                    {`${messages[key].to}: ${messages[key].subject} - ${messages[key].content}`}
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      </div>
      <Modal show={selectedEmail !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Email Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>To: </strong>
            {selectedEmail && selectedEmail.to}
          </p>
          <p>
            <strong>Subject: </strong>
            {selectedEmail && selectedEmail.subject}
          </p>
          <p>
            <strong>Content: </strong>
            {selectedEmail && selectedEmail.content}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Sent;
