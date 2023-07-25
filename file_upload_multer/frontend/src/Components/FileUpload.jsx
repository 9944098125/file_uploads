import React from "react";
import axios from "axios";

function FileUpload() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    console.log(reader);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post("http://localhost:5000/image-upload", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="file-upload-container">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
        {preview && <img src={preview} alt="" height={100} width={100} />}
      </div>
    </div>
  );
}

export default FileUpload;
