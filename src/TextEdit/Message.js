import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const Message = (props) => {
  const messages = useSelector((state) => state.inbox.messages);
  console.log(messages);
  return (
    <div
      style={{ position: "absolute", left: "30%", top: "30%", width: "100px" }}
    >
      {messages.map((message) => (
        <ul>
          <li>email={message.email}</li>
          <li>subject={message.subject}</li>
          <li>text={message.textArea}</li>
        </ul>
      ))}
      <Button onClick={props.onHide}>X</Button>
    </div>
  );
};

export default Message;
