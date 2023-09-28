import "./App.css";

import { Switch } from "react-router-dom";
import {
  BrowserRouter,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import SignUpPage from "./Componenets/Pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <SignUpPage></SignUpPage>
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
