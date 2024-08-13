import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

import "../App.css"; // Import the CSS file
import "bootstrap/dist/css/bootstrap.min.css";
import CryptoLands from "./CryptoLands.json";
import Layout from "../components/layout/layout";

const BuyProperty = () => {
  const [web3, setWeb3] = useState(null); // Web3 provider instance
  const [contract, setContract] = useState(null); // Contract instance
  const [buyTokenId, setBuyTokenId] = useState(0); // Token ID to buy
  const [buyAmount, setBuyAmount] = useState(0); // Amount to buy with
  const [account, setAccount] = useState(""); // User account address
  const [propertyData, setPropertyData] = useState(null); // Property data
  const [propertyId, setPropertyId] = useState(0); // Property ID to check
  const [contractLoaded, setContractLoaded] = useState(false); // Contract loaded flag
  const [nfts, setNFTs] = useState(null); // Metadata
  const [cid, setCid] = useState(""); // to get the cied to view data
  const [Imagecid, Setimagecid] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // smart contract loading
  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Error enabling Ethereum: ", error);
        }
      } else {
        console.log("Please install Metamask extension");
      }
    };

    const loadContract = async () => {
      if (web3) {
        try {
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = CryptoLands.networks[networkId];
          if (deployedNetwork) {
            const contractInstance = new web3.eth.Contract(
              CryptoLands.abi,
              deployedNetwork.address
            );
            setContract(contractInstance);
            console.log("Contract is loaded successfully");
          } else {
            console.log("Contract is not deployed on this network");
          }
        } catch (error) {
          console.error("Error loading contract: ", error);
        }
      }
    };

    if (web3 && !contractLoaded) {
      loadContract();
      setContractLoaded(true);
    }
    loadWeb3();
  }, [web3]);

  // Handle buying property
  const handleBuyProperty = async () => {
    if (!contract || !account) {
      console.error("Contract or account not loaded");
      return;
    }

    try {
      console.log("Buying property...");
      const result = await contract.methods
        ._BuyProperty(buyTokenId)
        .send({ from: account, value: web3.utils.toWei(buyAmount, "ether") });
      console.log("Property bought:", result.transactionHash);
      alert(`Property bought: ${result.transactionHash}`);
    } catch (error) {
      console.error("Failed to purchase:", error);
      alert("Failed to purchase property");
    }
  };

  // Check property data
  const checkProperty = async () => {
    if (!contract) {
      console.log("Contract not loaded");
      return;
    }

    try {
      console.log("Checking property data...");
      const property = await contract.methods.properties(propertyId).call();
      setPropertyData(property);
      setCid(property.detailsCID);
      console.log(property.detailsCID);
      console.log("Property data:", property);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  const fetchMetadata = useCallback(() => {
    fetch(`https://ipfs.io/ipfs/${cid}`)
      .then((response) => response.json())
      .then((metadata) => {
        setNFTs(metadata);
        Setimagecid(metadata.image);
        const hashvalueimage = Imagecid.replace("ipfs://", "");
        setImageUrl(`https://ipfs.io/ipfs/${hashvalueimage}`);
        console.log("god the metadata");
      })
      .catch((error) => {
        console.error("Error fetching metadata:", error);
      });
  }, [cid]);

  useEffect(() => {
    if (cid) {
      fetchMetadata();
    }
  }, [cid, fetchMetadata]);

  return (
    <Layout>
      <div className="row">
        <div className="col">
          <h1 className="mx-4">Property Viewer</h1>

          <div className="input-group m-3 w-50">
            <input
              type="text"
              className="form-control "
              placeholder="Enter Property ID"
              aria-label="Token ID"
              aria-describedby="basic-addon1"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
            />
            <div className="input-group-prepend">
              <button className="btn btn-success m-2" onClick={checkProperty}>
                Get Property Data
              </button>
            </div>
          </div>

          <div className="card-container" style={{ width: "75%" }}>
            {propertyData && (
              <div className="card">
                <img className="card-img-top" src={imageUrl} alt="" />
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="card-title">Property Details</h5>
                      <p className="card-text">
                        <strong>Nft ID:</strong>{" "}
                        {propertyData.tokenID.toString()}
                      </p>
                      <p className="card-text">
                        <strong>Owner:</strong> {propertyData.owner}
                      </p>
                      <p className="card-text">
                        <strong>Price:</strong> {propertyData.Price.toString()}{" "}
                        Ether
                      </p>
                      <p className="card-text">
                        <strong>Details CID:</strong> {propertyData.detailsCID}
                      </p>
                      <p className="card-text">
                        <strong>Verified:</strong>{" "}
                        {propertyData.verified ? "Yes" : "No"}
                      </p>
                      <p className="card-text">
                        <strong>Sale Status:</strong>{" "}
                        {propertyData.saleStatus ? "For Sale" : "Not for Sale"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title">Metadata</h5>
                      {nfts && (
                        <div>
                          <p className="card-text">
                            <strong>Name:</strong> {nfts.name}
                            <br />
                            <strong>Description:</strong> {nfts.description}
                          </p>
                          <p className="card-text">
                            <strong>Location:</strong> {nfts.location}
                          </p>
                          <p className="card-text">
                            <strong>Area:</strong> {nfts.area}
                          </p>
                          <p className="card-text">
                            <strong>Bedrooms:</strong> {nfts.bedrooms}
                          </p>
                          <p className="card-text">
                            <strong>Bathrooms:</strong> {nfts.bathrooms}
                          </p>
                          <p className="card-text">
                            <strong>Features:</strong>{" "}
                            {nfts.features.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col">
          <h2>Buy Property</h2>
          <div className="input-group m-3 w-50">
            <div className="input-group-prepend">
              <span className="input-group-text ml-2" id="basic-addon1">
                Token ID
              </span>
            </div>

            <input
              type="number"
              placeholder="Token ID"
              className="form-control w-25"
              aria-describedby="basic-addon1"
              value={buyTokenId}
              onChange={(e) => setBuyTokenId(e.target.value)}
            />
          </div>
          <div className="input-group m-3 w-50">
            <div className="input-group-prepend">
              <span className="input-group-text ml-2" id="basic-addon1">
                Buy Amount (ETH)
              </span>
            </div>
            <input
              type="number"
              placeholder="Buy Amount (ETH)"
              className="form-control w-25"
              aria-describedby="basic-addon1"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
            />
          </div>

          <button className="btn btn-success m-2" onClick={handleBuyProperty}>
            Buy Property
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BuyProperty;
