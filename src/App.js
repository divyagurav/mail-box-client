import { Route, Routes, Navigate } from "react-router-dom";
import AuthForm from "./Componenets/AuthForm";
import InboxList from "./Componenets/InBoxPage/InboxList";
import InboxPage from "./Componenets/InBoxPage/InboxPage";
import TextEditing from "./Componenets/TextEditing/TextEditing";

let islogin = localStorage.getItem("islogin") === "true";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AuthForm />}></Route>
        <Route path="/main/*" element={<InboxPage />}>
          <Route path="inboxlist" element={<InboxList />} />
          <Route path="text-edit" element={<TextEditing />} />
        </Route>
        {islogin && (
          <Route path="/login" element={<Navigate replace to="main" />} />
        )}
        {/* <TextEditing></TextEditing> */}
      </Routes>
    </div>
  );
}

export default App;
