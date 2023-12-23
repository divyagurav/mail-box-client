import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { inboxActions } from "../store/inboxSlice";

import classes from "./Inbox.module.css";
import Message from "./Message";
import { useSelector } from "react-redux";

const SenderInbox = () => {
  const [messages, setMessages] = useState([]);

  const read = useSelector((state) => state.inbox.read);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const selectedEmail = localStorage.getItem("email");
  const senderEmail = selectedEmail.replace(/[@.]/g, "");

  const recieverEmail = localStorage.getItem("emailId").replace(/[@.]/g, "");
  console.log(recieverEmail);

  const showInbox = senderEmail === recieverEmail;

  const fetchData = async () => {
    if (showInbox) {
      const response = await fetch(
        `https://profile-8d013-default-rtdb.firebaseio.com/${recieverEmail}/inbox.json`
      );

      const data = await response.json();
      console.log(data);

      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,

          email: data[key].email,
          subject: data[key].subject,
          textArea: data[key].textArea,
        });
      }

      setMessages(loadedData);

      dispatch(inboxActions.setMessages(loadedData));
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, recieverEmail]);

  // const getData = async () => {
  //   const response = await fetch(
  //     `https://profile-8d013-default-rtdb.firebaseio.com/${senderEmail}/inbox.json`
  //   );

  //   const data = await response.json();
  //   console.log(data);

  //   const loadedData = [];

  //   for (const key in data) {
  //     loadedData.push({
  //       id: key,

  //       email: data[key].email,
  //       subject: data[key].subject,
  //       textArea: data[key].textArea,
  //     });
  //   }

  //   setMessages(loadedData);

  //   dispatch(inboxActions.setMessages(loadedData));
  // };

  // const reciveData = async () => {
  //   const response = await fetch(
  //     `https://profile-8d013-default-rtdb.firebaseio.com/${recieverEmail}/inbox.json`
  //   );

  //   const data = await response.json();
  //   console.log(data);

  //   const loadedData = [];

  //   for (const key in data) {
  //     loadedData.push({
  //       id: key,

  //       email: data[key].email,
  //       subject: data[key].subject,
  //       textArea: data[key].textArea,
  //     });
  //   }

  //   setMessages(loadedData);

  //   dispatch(inboxActions.setMessages(loadedData));
  // };

  const showHandler = () => {
    setShow(true);

    dispatch(inboxActions.setRead());
  };

  const deletehandler = (id) => {
    fetch(
      `https://profile-8d013-default-rtdb.firebaseio.com/${recieverEmail}/inbox/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const hideHandler = () => {
    setShow(false);
  };

  return (
    <div>
      <div>
        <div>
          {messages.map((item) => (
            <ul>
              <li className={classes.sent} key={item.id}>
                {read && <span className={classes.dot}></span>}
                <button
                  onClick={showHandler}
                >{`Recieved by-${item.email}-subject-${item.subject}-text-${item.textArea}`}</button>{" "}
                <button
                  style={{
                    width: "25px",
                    border: "1px solid white",
                    marginLeft: "160px",
                  }}
                  onClick={() => {
                    deletehandler(item.id);
                  }}
                >
                  X
                </button>
              </li>
            </ul>
          ))}
        </div>

        {show && <Message onHide={hideHandler} />}
      </div>
    </div>
  );
};

export default SenderInbox;

//<span className={color ? classes.dot : classes.white}></span>
