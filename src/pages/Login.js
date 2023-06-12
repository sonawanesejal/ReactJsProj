import React, { useState } from "react";
import axios from "axios";
import {
  unameValidator,
  passwordValidator,
} from "../components/regexValidator";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, seterrorMessage] = React.useState("");
  const [successMessage, setsuccessMessage] = React.useState("");

  const { username, password } = data;

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formSubmitter = (e) => {
    e.preventDefault();
    setsuccessMessage("");
    // if (!unameValidator(data.username))
    //   return seterrorMessage("Please enter valid user id");

    // if (!passwordValidator(data.password))
    //   return seterrorMessage(
    //     "Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters"
    //   );
    //setsuccessMessage('Successfully Validated');
    // if(data.username !== 'Sejal@_1' || data.password !== 'Pass@123')
    axios
      .get(
        `http://localhost:8080/lms/checkAuth`,
        {
          params: { id: data.username, password: data.password },
        },
        {
          "Content-Type": "text/plain",
        }
      )
      .then(
        (res) => {
          if (res.data == "noAuth") {
            seterrorMessage("Invalid Username or Password");
          }
          if (res.data == "noUser") {
            seterrorMessage("Invalid Username or Password");
          }
          if (res.data == "authPass") {
            navigate("/dashboard");
          }
        }
        // navigate('/dashboard')}
      )
      .catch((err) => {
        seterrorMessage("Invalid username or password");
      });
    //  return seterrorMessage('Invalid username or password');

    // navigate('/dashboard')
  };

  return (
    <div className="context">
      <div className="container">
        <div
          className="btn-group btn-group-lg d-flex gap-2"
          role="group"
          aria-label="..."
        >
          <button type="button" className="btn btn-dark w-100 active">
            Home
          </button>
          <button type="button" className="btn btn-dark w-100">
            Employees
          </button>
          <button type="button" className="btn btn-dark w-100">
            Edit
          </button>
          <button type="button" className="btn btn-dark w-100">
            Add
          </button>
        </div>
        <div className="form-login">
          <form className="login" onSubmit={formSubmitter}>
            <span>Login</span>
            <br />
            {errorMessage.length > 0 && (
              <div style={{ marginBottom: "10px", color: "red" }}>
                {errorMessage}
              </div>
            )}
            {successMessage.length > 0 && (
              <div style={{ marginBottom: "10px", color: "green" }}>
                {successMessage}
              </div>
            )}
            <label htmlFor="username" className="label">
              <b>Username:</b>
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              id="username"
              value={username}
              onChange={handleChange}
            />
            <label htmlFor="password" className="label">
              <b>Password:</b>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              id="password"
              value={password}
              onChange={handleChange}
            />
            <button
              className="text-decoration-none btn btn-sm btn-dark"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
