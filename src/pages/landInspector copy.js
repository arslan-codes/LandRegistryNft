import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/glightbox/css/glightbox.min.css";

import "./assets/css/style.css";
import profileImg from "./assets/img/profile-img.jpg";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Web3, { ERR_INVALID_RESPONSE } from "web3";

import CryptoLands from "./CryptoLands.json";

import { toast } from "react-toastify";

function LandInspector() {
  //components
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  //for all properties
  const [allProperties, setAllProperties] = useState([]);
  const [Imagecid, Setimagecid] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  //for individual properties
  const [SaleStatusid, setSaleStatusid] = useState("");
  const [approveTokenId, setApproveTokenId] = useState(0);

  //to retreive data
  const [propertyData, setTempProperty] = useState(null);
  const [cid, setCid] = useState(null);
  const [nfts, setNFTs] = useState(null);
  const [nftsSingle, setNFTSinle] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          console.error("use is ", accounts[0]);
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.error("Please install MetaMask extension");
      }
    };

    const initContract = async () => {
      try {
        const networkId = await web3.eth.net.getId();
        console.log("Network ID:", networkId);
        const deployedNetwork = CryptoLands.networks[networkId];

        if (!deployedNetwork) {
          throw new Error(
            `Contract network not found for network ID: ${networkId}`
          );
        }

        const contractInstance = new web3.eth.Contract(
          CryptoLands.abi,
          deployedNetwork.address
        );
        setContract(contractInstance);
        console.log("Contract is initialized");
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    if (web3) {
      initContract();
    } else {
      initWeb3();
    }
  }, [web3]);

  const handleApproveProperty = async () => {
    if (!contract) {
      console.error("Contract not loaded");
      return;
    }
    try {
      const result = await contract.methods
        .approveProperty(approveTokenId)
        .send({ from: account });
      console.log("Property Approved:", result);
      toast.success("Property Approved:", result);
    } catch (error) {
      console.error("Error approving property:", error);
      toast.error("Error approving property:", error);
    }
  };
  const fetchAllProperties = async () => {
    try {
      if (contract && account) {
        const allPropertiesData = await contract.methods
          .getAllProperties(account)
          .call();
        const propertiesWithMetadata = [];

        for (const property of allPropertiesData) {
          const metadata = await fetchMetadata(property.detailsCID);
          const imageHash = metadata.image.replace("ipfs://", "");
          if (imageHash == "") {
            imageHash = "QmZWSagaDXAX6YEHuhqQuPiFiYayUJQS6h8J3khAyj6d7U";
            console.log("this hash was missing ");
          }
          const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;
          propertiesWithMetadata.push({ ...property, metadata, imageUrl });
        }

        setAllProperties(propertiesWithMetadata);
      } else {
        console.error("Contract not initialized");
      }
    } catch (error) {
      console.error("Error fetching all properties:", error);
    }
  };
  const fetchMetadata = async (detailsCID) => {
    try {
      const response = await fetch(`https://ipfs.io/ipfs/${detailsCID}`);
      const metadata = await response.json();
      const imageHash = metadata.image.replace("ipfs://", "");
      if (imageHash == "") {
        imageHash = "QmZWSagaDXAX6YEHuhqQuPiFiYayUJQS6h8J3khAyj6d7U";
        console.log("this hash was missing ");
      }
      const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;
      return { ...metadata, imageUrl };
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null;
    }
  };

  const SinglefetchMetadata = useCallback(() => {
    fetch(`https://ipfs.io/ipfs/${cid}`)
      .then((response) => response.json())
      .then((metadata) => {
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

  const ReturnPropertyData = async (e) => {
    setApproveTokenId(e);
    console.log(e);
    if (!contract) {
      console.log("error contract not loaded");
    }

    try {
      console.log("Checking property data...");
      const property = await contract.methods.properties(approveTokenId).call();
      setTempProperty(property);
      setCid(property.detailsCID);
      console.log(property.detailsCID);
      console.log("Property data:", property);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  const RejectProperty = async () => {
    if (!contract || !account) {
      console.error("Contract or account not loaded");
      return;
    }

    try {
      const val = await contract.methods
        .RejectProperty(SaleStatusid)
        .send({ from: account });
      toast.success("Property Rejected ");
      console.log("Property Rejected");
      setAllProperties([]);
    } catch (error) {
      console.error("Error Rejecting property :", error);
      toast.error("Error Error Rejecting property:", error);
    }
  };

  return (
    <div className="App">
      <div>
        <header id="header">
          <div className="d-flex flex-column">
            <div className="profile">
              <img
                src={profileImg}
                alt=""
                className="img-fluid rounded-circle"
              />
              <h1 className="text-light">
                <a href="index.html">Land Inspector</a>
              </h1>
              <div className="social-links mt-3 text-center"></div>
            </div>

            <nav id="navbar" className="nav-menu navbar">
              <ul>
                <li>
                  <a href="#Viewall" className="nav-link scrollto active">
                    <i className="bx bx-home"></i>{" "}
                    <span>View All Properties</span>
                  </a>
                </li>
                <li>
                  <a href="#approve" className="nav-link scrollto">
                    <i className="bx bx-home-alt-2"></i>
                    <span>Aprrove Property Token</span>
                  </a>
                </li>
                <li>
                  <a href="#forsale" className="nav-link scrollto">
                    <i className="bx bx-book-content"></i>
                    <span>Reject Property</span>
                  </a>
                </li>
                <li>
                  <a href="./" className="nav-link scrollto">
                    <i className="bx bx-minus-back "></i>
                    <span>Back To Main Site</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
      {/* ending header section here */}
      {/* MAIN SECTION STARTS HERE  */}
      <main id="main">
        <section id="Viewall">
          <div className="">
            <div className="section-title">
              <h2 className="mx-3">All Properties</h2>
              <div id="col1">
                <div>
                  <button
                    className="btn btn-success m-4"
                    onClick={fetchAllProperties}
                  >
                    Fetch All Properties
                  </button>
                  <div className="container ">
                    <div className="row row-cols-5 g-0 justify-content-center ">
                      {allProperties.map((property, index) => (
                        // <div className="card ">
                        <div key={index} className="card">
                          <img
                            className="card-img-top"
                            src={property.imageUrl}
                            alt="Image not on ipfs"
                          />
                          <div className="card-body px-2">
                            <div className="row">
                              <div className="col-md-6">
                                <h6 className="card-title">Property Details</h6>
                                <p className="card-text">
                                  <strong>ID:</strong>{" "}
                                  {property.tokenID.toString()}
                                </p>
                                <p className="card-text">
                                  <strong>Owner:</strong> {property.owner}
                                </p>
                                <p className="card-text">
                                  <strong>Details CID:</strong>{" "}
                                  {property.detailsCID}
                                </p>
                                <p className="card-text">
                                  <strong>Verified:</strong>{" "}
                                  {property.verified ? "Yes" : "No"}
                                </p>
                                <p className="card-text">
                                  <strong>owner Name:</strong>{" "}
                                  {property.ownerName}
                                </p>
                                <p className="card-text">
                                  <strong>Cnic:</strong> {property.ownerCnic}
                                </p>
                                <p className="card-text">
                                  <strong>Sale Status:</strong>{" "}
                                  {property.saleStatus
                                    ? "For Sale"
                                    : "Not for Sale"}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <h6 className="card-title">Metadata</h6>
                                {property.metadata && (
                                  <div>
                                    <p className="card-text">
                                      <strong>Name:</strong>{" "}
                                      {property.metadata.name}
                                      <br />
                                      <strong>Description:</strong>{" "}
                                      {property.metadata.description}
                                    </p>
                                    <p className="card-text">
                                      <strong>Location:</strong>{" "}
                                      {property.metadata.location}
                                    </p>
                                    <p className="card-text">
                                      <strong>Area:</strong>{" "}
                                      {property.metadata.area}
                                    </p>
                                    <p className="card-text">
                                      <strong>Bedrooms:</strong>{" "}
                                      {property.metadata.bedrooms}
                                    </p>
                                    <p className="card-text">
                                      <strong>Bathrooms:</strong>{" "}
                                      {property.metadata.bathrooms}
                                    </p>
                                    <p className="card-text">
                                      <strong>Features:</strong>{" "}
                                      {property.metadata.features.join(", ")}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section approve token */}
        <section id="approve" className="about">
          <div className="container">
            <div className="section-title">
              <h2 className="mx-3">Approve Property Token</h2>
              <div id="col2" className="section">
                <div className="input-group m-3 w-50">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Token ID"
                    aria-label="Token ID"
                    aria-describedby="basic-addon1"
                    value={approveTokenId}
                    onChange={(e) => ReturnPropertyData(e.target.value)}
                  />
                </div>
                <div className="m-4">
                  {propertyData && (
                    <div className="card ">
                      <div className="card-body p-4">
                        <div className="col-md-6">
                          <h5 className="card-title">Property Details</h5>
                          <p className="card-text">
                            <strong>Reg ID:</strong>{" "}
                            {propertyData.tokenID.toString()}
                          </p>
                          <p className="card-text">
                            <strong>Owner:</strong> {propertyData.owner}
                          </p>
                          <p className="card-text">
                            <strong>owner Name:</strong>{" "}
                            {propertyData.ownerName}
                          </p>
                          <p className="card-text">
                            <strong>Cnic:</strong> {propertyData.ownerCnic}
                          </p>
                          <p className="card-text">
                            <strong>Price:</strong>{" "}
                            {propertyData.Price.toString()} Ether
                          </p>
                          <p className="card-text">
                            <strong>Details CID:</strong>{" "}
                            {propertyData.detailsCID}
                          </p>
                          <p className="card-text">
                            <strong>Verified:</strong>{" "}
                            {propertyData.verified ? "Yes" : "No"}
                          </p>
                          <p className="card-text">
                            <strong>Sale Status:</strong>{" "}
                            {propertyData.saleStatus
                              ? "For Sale"
                              : "Not for Sale"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-success m-2"
                  onClick={handleApproveProperty}
                >
                  Approve Property Token
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="forsale" className="forsale">
          <div className="container">
            <div className="section-title">
              <h2 className="mx-3">Reject Property </h2>
              <div id="col3" className="section">
                <h5 className="px-3"> Enter the register Id</h5>
                <div className="input-group m-3 w-75">
                  <div className="input-group-prepend">
                    <span className="input-group-text ml-2" id="basic-addon1">
                      Register Id
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="       Register Id"
                    aria-label="       Register Id"
                    aria-describedby="basic-addon1"
                    value={SaleStatusid}
                    onChange={(e) => setSaleStatusid(e.target.value)}
                  />
                </div>
                <button className="btn btn-danger m-2" onClick={RejectProperty}>
                  Reject Property
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* */}
      </main>
    </div>
  );
}

export default LandInspector;
