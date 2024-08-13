import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CryptoLands from "./CryptoLands.json";
import Layout from "../components/layout/layout";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/seller.css";
import InputMask from "react-input-mask";

const SellerPage = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [allProperties, setAllProperties] = useState([]);
  const [price, setPrice] = useState("");
  const [detailsCID, setDetailsCID] = useState("");

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [FileHash, setFileHash] = useState("");

  const [Updatefile, setUpdateFile] = useState(null);
  const [UpdatefileName, setUpdateFileName] = useState("No image selected");
  const [UpdateFileHash, setUpdateFileHash] = useState("");
  const [UpdateDetailsCID, setUpdateDetailsCID] = useState("");
  // user credentials
  const [OwnerName, setOwnerName] = useState("");
  const [OwnerCnic, setOwnerCnic] = useState("");

  //for updation
  const [TokenNo, setTokenNo] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          console.log(accounts[0]);
          console.log();
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
        const deployedNetwork = CryptoLands.networks[networkId];
        const contractInstance = new web3.eth.Contract(
          CryptoLands.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(contractInstance);
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

  const registerProperty = async (event) => {
    event.preventDefault();

    if (!OwnerCnic || !/^\d{5}-\d{7}-\d$/.test(OwnerCnic)) {
      toast.error("Please enter a valid CNIC number (e.g., 12345-1234567-1)");
      return;
    }
    try {
      await contract.methods
        .registerProperty(
          detailsCID,
          web3.utils.toWei(price, "ether"),
          OwnerName,
          OwnerCnic
        )
        .send({ from: account });
      console.log("Property registered successfully");
      toast.success(`request for nft is sent ${detailsCID}`);
      // Refresh properties after registering a new one
      fetchAllProperties();
    } catch (error) {
      console.error("Error registering property:", error);
      toast.error("Error registering property:", error);
    }
  };
  const UpdateCidMethod = async () => {
    if (UpdateDetailsCID)
      try {
        await contract.methods
          .updatePropertyDetails(TokenNo, UpdateDetailsCID)
          .send({ from: account });
        toast.success("Property Updated");
        setAllProperties([]);
      } catch (error) {
        console.error("Error Updating property:", error);
        toast.error("Error Updating property:", error);
      }
  };

  //approve sale
  const SaleAvailable = async () => {
    try {
      await contract.methods.sell(TokenNo).send({ from: account });

      toast.success("Property Is ready for Sale");

      fetchAllProperties();
    } catch (error) {
      console.error("Error Making Avaialabe:", error);
      toast.error("Error Making Avaialab:", error);
    }
  };

  const fetchAllProperties = async () => {
    try {
      if (contract) {
        const allPropertiesData = await contract.methods
          .OwnedProperties(account)
          .call();

        const propertiesWithMetadata = [];

        for (const property of allPropertiesData) {
          const metadata = await fetchMetadata(property.detailsCID);
          const imageHash = metadata.image.replace("ipfs://", "");
          const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;
          propertiesWithMetadata.push({ ...property, metadata, imageUrl });
        }
        console.log("properties fetched");
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
      // Extracting the image hash from metadata
      const imageHash = metadata.image.replace("ipfs://", "");
      // Constructing the complete URL for the image
      const imageUrl = `https://ipfs.io/ipfs/${imageHash}`;
      return { ...metadata, imageUrl };
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null;
    }
  };

  useEffect(() => {
    if (contract && account) {
      fetchAllProperties();
    }
  }, [contract, account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `61dc523dec49dca05605`,
            pinata_secret_api_key: `ac13de7920c2f1ecef0622857dd46ad92b34fdf69167423615cae99841d039b7`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = resFile.data.IpfsHash;
        console.log("IPFS Hash:", ImgHash);
        setFileHash(ImgHash);
        setDetailsCID(ImgHash);
        toast.success("Successfully File Uploaded to Pinata");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    } else {
      alert("Please select an image to upload");
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (Updatefile) {
      try {
        const formData = new FormData();
        formData.append("file", Updatefile);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `61dc523dec49dca05605`,
            pinata_secret_api_key: `ac13de7920c2f1ecef0622857dd46ad92b34fdf69167423615cae99841d039b7`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = resFile.data.IpfsHash;
        console.log("IPFS Hash:", ImgHash);
        setUpdateFileHash(ImgHash);
        setUpdateDetailsCID(ImgHash);
        toast.success("Successfully Image Uploaded to Pinata");
        setUpdateFileName("No image selected");
        setUpdateFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    } else {
      alert("Please select an image to upload");
    }
  };

  const retrieupdateveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setUpdateFile(e.target.files[0]);
    };
    setUpdateFileName(e.target.files[0].name);
    e.preventDefault();
  };
  /* */
  return (
    <Layout>
      <div className="main-seller">
        <h1 className="m-3 text-dark">Seller Page</h1>
        <div className="row ">
          <div className="col seller-col">
            <h2 className=" px-2 text-dark">Register New Property</h2>
            <form onSubmit={registerProperty}>
              <div className="input-group m-2 w-75">
                <div className="input-group-prepend">
                  <span className="input-group-text ml-2" id="basic-addon1">
                    Price (ETH):
                  </span>
                </div>
                <input
                  type="number"
                  step="any"
                  className="form-control w-75"
                  aria-describedby="basic-addon1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              {/*  */}
              <div className="input-group m-2 w-75">
                <div className="input-group-prepend">
                  <span className="input-group-text ml-2" id="basic-addon1">
                    Owner Name:
                  </span>
                </div>
                <input
                  type="text"
                  step="any"
                  className="form-control w-75"
                  aria-describedby="basic-addon1"
                  value={OwnerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group m-2 w-75">
                <div className="input-group-prepend">
                  <span className="input-group-text ml-2" id="basic-addon1">
                    Owner Cnic:
                  </span>
                </div>
                {/* <input
                  type="text"
                  step="any"
                  className="form-control w-75"
                  aria-describedby="basic-addon1"
                  value={OwnerCnic}
                  onChange={(e) => setOwnerCnic(e.target.value)}
                  required
                /> */}
                <InputMask
                  mask="99999-9999999-9"
                  value={OwnerCnic}
                  className="form-control w-75"
                  onChange={(e) => setOwnerCnic(e.target.value)}
                  placeholder="XXXXX-XXXXXXX-X"
                  name="cnic"
                  required
                />
              </div>
              {/*  */}

              <div className="input-group m-2 w-75">
                <div className="input-group-prepend"></div>
                <input
                  step="any"
                  className="form-control w-75"
                  aria-describedby="basic-addon1"
                  disabled={!account}
                  type="file"
                  id="file-upload"
                  name="data"
                  onChange={retrieveFile}
                  required
                />{" "}
                <button
                  type="submit"
                  className=" btn upload mt-2  btn-success"
                  disabled={!file}
                  id="basic-addon1"
                  onClick={handleSubmit}
                >
                  Upload Your property File
                </button>
              </div>
              <div className="input-group m-2 w-75">
                <div className="input-group-prepend">
                  <span className="input-group-text ml-2" id="basic-addon1">
                    Details CID:
                  </span>
                </div>
                <input
                  className="form-control w-75"
                  aria-describedby="basic-addon1"
                  type="text"
                  value={FileHash}
                  onChange={(e) => setDetailsCID(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-success m-2" type="submit">
                Register Property
              </button>
            </form>
          </div>

          <div className="col seller-col">
            <h2 className=" px-2 text-dark">Update Your Property Metadata</h2>
            <div className="input-group m-2 w-75">
              <div className="input-group-prepend">
                <span className="input-group-text ml-2" id="basic-addon1">
                  Token number
                </span>
              </div>
              <input
                className="form-control w-50"
                aria-describedby="basic-addon1"
                type="number"
                value={TokenNo}
                onChange={(e) => setTokenNo(e.target.value)}
                required
              />
            </div>
            <div className="input-group m-2 w-75">
              <div className="input-group-prepend"></div>
              <input
                step="any"
                className="form-control w-75"
                aria-describedby="basic-addon1"
                disabled={!account}
                type="file"
                id="file-upload"
                name="data"
                onChange={retrieupdateveFile}
                required
              />

              {/* const [Updatefile, setUpdateFile] = useState(null);
const [UpdatefileName, setUpdateFileName] = useState("No image selected");
const [UpdateFileHash, setUpdateFileHash] = useState(""); " */}
              <button
                type="submit"
                className=" btn upload mt-2  btn-success"
                disabled={!Updatefile}
                id="basic-addon1"
                onClick={handleUpdate}
              >
                Upload Your Updated Property File
              </button>
            </div>
            <div className="input-group m-2 w-75">
              <div className="input-group-prepend">
                <span className="input-group-text ml-2" id="basic-addon1">
                  Updated Details CID:
                </span>
              </div>
              <input
                className="form-control w-50"
                aria-describedby="basic-addon1"
                type="text"
                value={UpdateDetailsCID}
                onChange={(e) => setUpdateDetailsCID(e.target.value)}
                required
              />
            </div>
            <button
              className="btn btn-success m-2"
              type="submit"
              onClick={UpdateCidMethod}
            >
              Update Property
            </button>
            <h3 className=" px-2 text-dark"> Make Your Properties For sale</h3>
            <div className="input-group m-2 w-75">
              <div className="input-group-prepend">
                <span className="input-group-text ml-2" id="basic-addon1">
                  Enter The Token Id
                </span>
              </div>
              <input
                className="form-control w-50"
                aria-describedby="basic-addon1"
                type="number"
                value={TokenNo}
                onChange={(e) => setTokenNo(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-success m-2" onClick={SaleAvailable}>
              Sale Property
            </button>
          </div>
        </div>

        <div className="instruction-manual container mt-4 ">
          <h2 className=" mt-4">Instruction Manual for Sellers</h2>
          <div className="card-guide">
            <div className="card-body">
              <p className="card-text">
                Please ensure your property files are in the following format:
              </p>
              <p className="card-text text-danger">
                Before registering your property, please upload your image to
                IPFS or Pinata to obtain the CID for your metadata.
              </p>
              <pre className="card-text">
                {`{
  "name": "Lakeview Villa",
  "description": "A beautiful lakeside property with stunning views",
  "image": "ipfs://QmW5hiU1vd1pt3JLRC7gxNYXbtjkxdyL1bxbNiUXWm4DB2",
  "location": "123 Lakefront Drive, Anytown",
  "area": "2500 square feet",
  "bedrooms": "4",
  "bathrooms": "2.5",
  "features": ["Scenic lake views", "Spacious living area", "Modern kitchen"]
}`}
              </pre>
              <p className="card-text text-success">
                You can also use the upload property button to upload the image
                to get your image hash if you dont want to use ipfs locally
              </p>
            </div>
          </div>
        </div>
        <h2>My Properties</h2>
        <div className=" ">
          <div className="row row-cols-5 g-0">
            {allProperties.map((property, index) => (
              // <div className="card ">
              <div key={index} className="card">
                <img
                  className="card-img-top"
                  src={property.imageUrl}
                  alt="Image not on ipfs"
                />

                <div className="card-body pt-0 p-2">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="card-title">Property Details</h6>
                      <p className="card-text">
                        <strong>ID:</strong> {property.tokenID.toString()}
                      </p>
                      <p className="card-text">
                        <strong>Owner:</strong> {property.owner}
                      </p>
                      <p className="card-text">
                        <strong>Owner Name:</strong> {property.ownerName}
                      </p>
                      <p className="card-text">
                        <strong>Details CID:</strong> {property.detailsCID}
                      </p>

                      <p className="card-text">
                        <strong>Verified:</strong>{" "}
                        {property.verified ? "Yes" : "No"}
                      </p>
                      <p className="card-text">
                        <strong>Sale Status:</strong>{" "}
                        {property.saleStatus ? "For Sale" : "Not for Sale"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title">Metadata</h5>
                      {property.metadata && (
                        <div>
                          <p className="card-text">
                            <strong>Name:</strong> {property.metadata.name}
                            <br />
                            <strong>Description:</strong>{" "}
                            {property.metadata.description}
                          </p>
                          <p className="card-text">
                            <strong>Location:</strong>{" "}
                            {property.metadata.location}
                          </p>
                          <p className="card-text">
                            <strong>Area:</strong> {property.metadata.area}
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
    </Layout>
  );
};

export default SellerPage;
