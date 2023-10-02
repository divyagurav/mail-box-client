import { Button } from "react-bootstrap";
import "./App.css";
import SignupDetails from "./components/signup";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginDetails from "./components/login";
import ComposeEmail from "./components/composemail";
import NavbarDetails from "./components/Navbar";
import { useSelector } from "react-redux";
import Inbox from "./components/Inbox";
import Sent from "./components/sentbox";


function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <NavbarDetails />
      <Switch>
        <Route exact path="/login">
          <LoginDetails />
        </Route>
        <Route exact path="/signup">
          <SignupDetails />
        </Route>
        <Route exact path="/composemail">
          {isAuthenticated && <ComposeEmail />}
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>
        <Route path="/inbox">
          {isAuthenticated && <Inbox />}
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>
        <Route path="/sent">
          {isAuthenticated && <Sent />}
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
