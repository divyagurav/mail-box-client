import React, { useState, useEffect } from "react";
import classes from "./SentData.module.css";

const SentData = () => {
  const [sentData, setSentData] = useState([]);

  const selectedEmail = localStorage.getItem("email");
  const fetchEmail = selectedEmail.replace(/[@.]/g, "");

  const fetchData = async () => {
    const response = await fetch(
      `https://profile-8d013-default-rtdb.firebaseio.com/${fetchEmail}/sent.json`
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

    setSentData(loadedData);
    console.log(loadedData);
    // dispatch(inboxActions.setMessages(loadedData));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, fetchEmail]);

  const deletehandler = (id) => {
    fetch(
      `https://profile-8d013-default-rtdb.firebaseio.com/${fetchEmail}/sent/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div>
      <div>
        {sentData.map((item) => (
          <ul>
            <li className={classes.sent} key={item.id}>
              <button>{`send to=${item.email}
              subject-${item.subject}
              text-${item.textArea}`}</button>{" "}
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
    </div>
  );
};

export default SentData;
