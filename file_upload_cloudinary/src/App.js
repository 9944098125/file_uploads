import React from "react";
import "./App.css";

function App() {
  const [savedPath, setSavedPath] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    console.log(savedPath);
  };

  async function onChangeImage(file) {
    if (file === undefined) {
      return;
    } else if (
      file.type === "img/jpeg" ||
      "img/jpg" ||
      "img/png" ||
      "img/svg"
    ) {
      setLoading(true);
      const imageToBeUploaded = new FormData();
      imageToBeUploaded.append("file", file);
      imageToBeUploaded.append("upload_preset", "aroha___");
      imageToBeUploaded.append("cloud_name", "dakda5ni3");
      await fetch("https://api.cloudinary.com/v1_1/dakda5ni3/image/upload", {
        method: "POST",
        body: imageToBeUploaded,
      })
        .then((res) => res.json())
        .then((jsonData) => setSavedPath(jsonData.url))
        .catch((err) => console.log(err));
      setLoading(false);
    } else {
      return;
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => onChangeImage(e.target.files[0])} />
        <button disabled={loading} className="btn" type="submit">
          Submit
        </button>
      </form>
      {savedPath && <img src={savedPath} alt="" />}
    </div>
  );
}

export default App;
