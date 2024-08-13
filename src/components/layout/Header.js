import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "../../styles/authstyle.css";
import Web3 from "web3";
import { toast } from "react-toastify";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("data"));
  const [account, setAccount] = useState(null);
  const [landInspector, setLandInspectorobj] = useState(null);

  async function requestAccount() {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("detected");
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Obj = new Web3(window.ethereum);
        const accounts = await web3Obj.eth.getAccounts();
        setAccount(accounts[0]);
        toast.success(account.toString());
        if (account === "0x244a901b522818899bf702223f8841510B75713f") {
          setLandInspectorobj(account);
        }
        console.log(accounts);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <NavLink to="" className="nav-link"></NavLink>

        <div className="flexCenter h-menu">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          {landInspector && (
            <NavLink to="/LandInspector" className="nav-link">
              LandInspector
            </NavLink>
          )}
          <NavLink to="/sellerpage" className="nav-link">
            Sell Property
          </NavLink>

          <NavLink to="/Marketplace" className="nav-link">
            Marketplace
          </NavLink>
          <NavLink to="/Property" className="nav-link"></NavLink>

          <NavLink to="/about" className="nav-link">
            About Us
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact Us
          </NavLink>
          <NavLink to="/Blog" className="nav-link">
            Blog
          </NavLink>

          {
            <button className="button" onClick={requestAccount}>
              Connect wallet
            </button>
          }
        </div>
      </div>
    </section>
  );
};

export default Header;
