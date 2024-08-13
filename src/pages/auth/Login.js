import Layout from "../../components/layout/layout";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        password,
        email,
      });
      if (res.data) {
        toast.success(res.data.message);
        localStorage.setItem("data", JSON.stringify(res.data));
        console.log(res.data); // Log the user data received from the server
        // Fetch additional user data here if needed
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login">
      <div className="loginPageContainer">
        <div className="loginFormContainer">
          <div className="loginHeaderSection">
            <div className="loginHeaderText">
              <h3>LOGIN</h3>
              <p>Please enter your credentials to login.</p>
            </div>
          </div>
          <form className="loginInputForm" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <p className="registrationMessage">
              Not registered? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
