import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import "../../styles/register.css";
import { toast } from "react-toastify";
import axios from "axios";
import InputMask from "react-input-mask";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setcnic] = useState("");
  const [walletaddress, setwalletaddress] = useState("");
  // password	name	email	address	phone	cnic	walletaddress
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    // Validate name: Ensure it's not empty and contains only alphabets
    if (!name || !/^[a-zA-Z]+$/.test(name)) {
      toast.error("Please enter a valid name");
      return;
    }

    // Validate email: Ensure it's not empty and follows a valid email pattern
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone: Ensure it's not empty and follows a valid phone pattern
    if (!phone || !/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Validate address: Ensure it's not empty
    if (!address) {
      toast.error("Please enter your address");
      return;
    }

    // Validate password: Ensure it's not empty and meets the minimum length requirement
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Validate CNIC: Ensure it's not empty and follows a valid CNIC pattern
    if (!cnic || !/^\d{5}-\d{7}-\d$/.test(cnic)) {
      toast.error("Please enter a valid CNIC number (e.g., 12345-1234567-1)");
      return;
    }
    // Validate wallet address: Ensure it's not empty
    if (!walletaddress) {
      toast.error("Please enter your wallet address");
      return;
    }

    // If all validations pass, proceed with form submission
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          password,
          name,
          email,
          address,
          phone,
          cnic,
          walletaddress,
        }
      );
      if (res.data) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="wrapper">
        <h2>Registration</h2>
        <form onSubmit={HandleSubmit}>
          <div className="input-box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              required
            />
          </div>
          <div className="input-box">
            <InputMask
              mask="99999-9999999-9"
              value={cnic}
              onChange={(e) => setcnic(e.target.value)}
              placeholder="XXXXX-XXXXXXX-X"
              name="cnic"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              value={walletaddress}
              onChange={(e) => setwalletaddress(e.target.value)}
              placeholder="Enter Your MetaMask Wallet"
              required
            />
          </div>

          <div className="input-box button">
            <input type="Submit" defaultValue="Register Now" />
          </div>
          <div className="text">
            <h3>
              Already have an account? <Link to="/login">Login now</Link>
            </h3>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
