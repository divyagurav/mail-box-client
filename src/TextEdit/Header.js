import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };
  return (
    <div>
      <header>
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            position: "absolute",
            left: "0%",
            top: "0%",
            width: "100%",
            height: "60px",
            textAlign: "left",
            padding: "5px",
            paddingLeft: "50px",
            fontSize: "30px",
            fontFamily: "sans-serif",
          }}
        >
          Welcome to mailBox Client{" "}
        </div>

        {isLoggedIn && (
          <NavLink
            to="/textedit"
            style={{
              color: "white",
              position: "absolute",
              left: "40%",
              top: "3%",
            }}
          >
            compose
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink
            to="/sentdata"
            style={{
              color: "white",
              position: "absolute",
              left: "50%",
              top: "3%",
            }}
          >
            sent
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink
            to="/inbox"
            style={{
              color: "white",
              position: "absolute",
              left: "60%",
              top: "3%",
            }}
          >
            inbox
          </NavLink>
        )}

        <Button
          variant="outline-danger"
          style={{ position: "absolute", right: "3%", top: "1%" }}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </header>
    </div>
  );
};

export default Header;
