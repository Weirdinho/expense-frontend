import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Orb from "../Orb/Orb";
import bg from "../../img/bg.png";
import { mail, password, user } from "../../utils/icons";

function LoginSignup() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  }); 
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(""); // Reset errors before each request

    // Client-side validation
    let validationErrors = [];
    if (isSignup && !formData.username)
      validationErrors.push("Username is required.");
    if (!formData.email) validationErrors.push("Email is required.");
    if (!formData.password) validationErrors.push("Password is required.");
    if (formData.password.length < 8)
      validationErrors.push("Password must be at least 8 characters.");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const url = isSignup
        ? "http://localhost:5000/api/signup"
        : "http://localhost:5000/api/login";
      const response = await axios.post(url, formData);

      // Store authentication details
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("username", response.data.username);
      window.location.href = "/";
    } catch (err) {
      // Extract error messages from server response
      if (err.response && err.response.data) {
        if (Array.isArray(err.response.data.message)) {
          setErrors(err.response.data.message); // Handle multiple error messages
        } else {
          setErrors([err.response.data.message]); // Handle single error messages
        }
      } else {
        setErrors(["Something went wrong. Please try again."]);
      }
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AuthContainer bg={bg} className="App">
      {orbMemo}
      <FormStyled onSubmit={handleSubmit}>
        <p>{isSignup ? "Hello There," : "Welcome Back,"}</p>
        <h2>{isSignup ? "SIGN UP!" : "LOG IN!"}</h2>

        {/* Error Display Box */}
        {errors.length > 0 && (
          <ErrorBox>
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </ErrorBox>
        )}

        {isSignup && (
          <div className="input-div">
            {user}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="input-div">
          {mail}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-div">
          {password}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

        <p className="p-btm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setErrors(""); // Clear errors when toggling between Sign Up and Login
              setFormData({ username: "", email: "", password: "" }); // Clear form data
            }}
          >
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </FormStyled>
    </AuthContainer>
  );
}

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormStyled = styled.form`
  background: white;
  opacity: 1;
  position: fixed;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }
  .input-div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: rgba(34, 34, 96, 1);
  }

  input {
    width: 90%;
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: 1px solid #ddd;
    border-radius: 15px;
  }

  button {
    width: 100%;
    padding: 0.8rem;
    background: rgba(34, 34, 96, 0.65);
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    margin-top: 20px;
  }
  button:hover {
    background: rgba(34, 34, 96, 1);
  }

  .p-btm {
    margin-top: 20px;
  }

  span {
    color: blue;
    cursor: pointer;
  }
`;

// Styled error box for better visibility
const ErrorBox = styled.div`
  background: #ffcccc;
  color: #cc0000;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: left;
`;

export default LoginSignup;
