const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(express.json());
app.use(cors());

app.post("/upload", (req, res) => {
  const base64String = req.body.base64String;
  if (!base64String) {
    return res.status(400);
  }
  console.log(base64String);
  return res
    .status(200)
    .json({ message: "Image uploaded successfully.", base64String });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
