import React from "react";
import "./InboxPage.css";
import { Container, Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import { Nav } from "react-bootstrap";
import InboxList from "./InboxList";
import InboxNavbar from "./InboxNavBar";
import TextEditing from "../TextEditing/TextEditing";
import { getmailHandler } from "../../store/Mail-thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateList } from "../../store/Mail-thunk";
import MessageView from "./MessageView";
import SentMessage from "../SendMessage/SendMessage";

let isinitialState = true;

const InboxPage = () => {
  const Items = useSelector((state) => state.mail.items);
  const count = useSelector((state) => state.mail.count);
  const unread = useSelector((state) => state.mail.unread);
  const Disptach = useDispatch();
  console.log("beforeupdate", Items);
  useEffect(() => {
    Disptach(getmailHandler());
  }, []);
  useEffect(() => {
    if (count > 0) {
      Disptach(getmailHandler());
    }
  }, [count]);
  return (
    <>
      <InboxNavbar></InboxNavbar>
      <Container fluid>
        <Row style={{ height: "650px" }}>
          <Col xs={2} className=" bg-info" variant="primary">
            <ListGroup className="p-2" as="ul">
              <Link to="text-edit">
                <ListGroup.Item className="m-1 bg-" action>
                  Compose
                </ListGroup.Item>
              </Link>
              <Link to="inboxlist">
                <ListGroup.Item className="m-1 bg-" action>
                  <div className="indbox-cont">
                    <p>inbox</p>
                    <h5>{unread}</h5>
                  </div>
                </ListGroup.Item>
              </Link>
              <ListGroup.Item className="m-1" action>
                <Link to="#">sendMail</Link>
              </ListGroup.Item>
              <Link to="sentmessage">
                <ListGroup.Item className="m-1" action>
                  sendMail
                </ListGroup.Item>
              </Link>
              <ListGroup.Item className="m-1" action>
                DraftBox
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={10} className="">
            {/* <ListGroup className="flex">
              <ListGroupItem> sone text</ListGroupItem>
            </ListGroup> */}
            <Routes>
              <Route path="/inboxlist/mailview" element={<MessageView />} />
            </Routes>
            {/* <InboxList></InboxList> */}
            <Outlet></Outlet>
            {/* <MessageView></MessageView> */}
            {/* <TextEditing></TextEditing> */}
            {/* <TextEditing></TextEditing> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default InboxPage;
