import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Marketplace from "./pages/Marketplace";
import Property from "./pages/Property";
import MarketPlace from "./pages/Marketplace";
import SellerPage from "./pages/sellerpage";
import { toast } from "react-toastify";
import Blog from "./pages/blog";
import BuyProperty from "./pages/BuyProperty";
// import { AuthContext } from "./AuthContext"; // Assuming you have an AuthContext for managing authentication state
import Web3 from "web3";

import LandInspector from "./pages/landInspector copy";

function App() {
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [LandInspectorobj, setLandInspectorobj] = useState(null);

  useEffect(() => {
    const LoadAccount = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const web3Instance = new Web3(window.ethereum);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          toast.error(error);
        }
      }
    };

    LoadAccount();
  }, []);

  useEffect(() => {
    if (account === "0x244a901b522818899bf702223f8841510B75713f") {
      setLandInspectorobj(account);
    } else {
      const userData = JSON.parse(localStorage.getItem("data"));

      if (userData) {
        setUser(userData);
        console.log(user);
      }
    }
  }, [account]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="/Marketplace" element={<Marketplace />} />

      {/* Protected routes */}
      {LandInspectorobj && (
        <Route path="/landInspector" element={<LandInspector />} />
      )}
      {<Route path="/sellerpage" element={<SellerPage />} />}
      {/* {user && <Route path="/buyProperty" element={<BuyProperty />} />} */}
      <Route path="/marketplace" element={<MarketPlace />} />

      {/* Redirect to login for unauthorized access */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
