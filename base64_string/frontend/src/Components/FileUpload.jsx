import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a file preview using FileReader
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      return;
    }

    // Convert the image to base64 string
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      // Send the base64String to the backend
      axios
        .post("http://localhost:5000/upload", { base64String })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <h2>File Upload Example</h2>
      <input type="file" onChange={handleFileChange} />
      {previewImage && (
        <img src={previewImage} alt="Preview" style={{ width: "200px" }} />
      )}
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
