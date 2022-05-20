import classes from "./Login.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axiosConfig.js";

function Login() {
  const history = useHistory();
  const [errors, setErrors] = useState({
    usernameErrors: false,
    passwordErrors: false,
  });

  const submitLogin = (event) => {
    event.preventDefault();
    let usernameErrors = false;
    let passwordErrors = false;
    console.log(event.target.elements.username.value);
    if (event.target.elements.username.value) {
      if (event.target.elements.username.value.trim() === "") {
        usernameErrors = true;
      }
    } else {
      usernameErrors = true;
    }
    if (event.target.elements.password.value) {
      if (event.target.elements.password.value.trim() === "") {
        usernameErrors = true;
      }
    } else {
      passwordErrors = true;
    }
    if (usernameErrors || passwordErrors) {
      setErrors({ usernameErrors, passwordErrors });
      return;
    }
    const formData = new FormData();
    formData.append("username", event.target.elements.username.value.trim());
    formData.append("password", event.target.elements.password.value.trim());
    //   formData.append("user_type", 1);
    axios.post("/api/v1/users", formData).then((res) => {
      //   console.log(res);
      localStorage.setItem(
        "username",
        event.target.elements.username.value.trim()
      );
      console.log(res.data);
      history.push("/events");
      window.location.reload(false);
    });
  };

  return (
    <div className={classes.Login}>
      <h1 className={classes.LoginHeader}>Login</h1>
      <form className={classes.LoginBox} onSubmit={submitLogin}>
        <input id="username"></input>
        <p>Username</p>
        {errors.usernameErrors && <p>Invalid username</p>}
        <input id="password" type="password"></input>
        <p>Password</p>
        {errors.passwordErrors && <p>Invalid password</p>}
        <button>Button</button>
      </form>
    </div>
  );
}

export default Login;
