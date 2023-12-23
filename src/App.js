import "./App.css";
import TextEdit from "./TextEdit/TextEdit";
import { Route, Routes } from "react-router-dom";
import SentDataPage from "./Pages/SentDataPage";
import Header from "./TextEdit/Header";
//import TextBar from "./TextEdit/TextBar";
import Message from "./TextEdit/Message";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";

import SenderInbox from "./TextEdit/SenderInbox";

function App() {
  return (
    <div className="App">
      {/* <TextBar /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/textedit" element={<TextEdit />}></Route>
        <Route path="/text" element={<TextEdit />}></Route>
        <Route path="/header" element={<Header />}></Route>
        <Route path="/sentdata" element={<SentDataPage />}></Route>
        <Route path="/message" elememt={<Message />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/inbox" element={<SenderInbox />}></Route>
      </Routes>
    </div>
  );
}

export default App;
