import "./App.css";

import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Pages/SignUpPage";
import Welocme from "./Components/Auth/Welcome";

import TextEditorPage from "./Components/Pages/TextEditorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUpPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/welcome" element={<Welocme />}></Route>
        <Route path="/text" element={<TextEditorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
