import axios from "axios";
import React, { useState } from "react";

const IPFSUploader = () => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filedata = new FormData();
      filedata.append("file", file);
      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: filedata,
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      const fileUrl =
        "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
      console.log("File URL:", fileUrl);

      // Fetch the content of the file using its hash
      const response = await axios.get(fileUrl);
      setFileContent(response.data);
      console.log("File content:", response.data);
    } catch (error) {
      console.error("Error:", error);
      // Handle error: Display a message to the user or perform appropriate action
    }
  };

  return (
    <div className="container bg-black text-light">
      <form onSubmit={handleSubmit}>
        <h1>Upload a File</h1>
        <input
          className="form-control"
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>

      {fileContent && (
        <div>
          <h2>File Content</h2>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default IPFSUploader;
