const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/image-upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400);
  }
  console.log(req.file);
  res.status(200).json({ message: "File Uploaded successfully" });
});

const port = 5000;

app.listen(port, () => {
  console.log(`App is now running on port ${port}`);
});
