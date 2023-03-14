require("dotenv").config();
const express = require("express");
const PropertiesController = require("./controllers/PropertiesController");
const { initDB } = require("./models/init");
const {
  S3PropertyUploadMiddleware,
} = require("./middlewares/S3PropertyImageUpload");

initDB();
const app = express();
app.use(express.json());

const multer = require("multer");
const storage = multer.memoryStorage({});
const upload = multer({ storage: storage });

app.post(
  "/test",
  [upload.single("image"), S3PropertyUploadMiddleware],
  (req, res) => {
    console.log("Server is working");

    return res.status(200).send({
      success: true,
      message: "successful",
    });
  }
);

app.get("/search", PropertiesController.searchProperties);
app.get("/search/:id", PropertiesController.getSinglePropertyById);

app.listen(3002, async () => {
  console.log("Server is running on port 3002");
});
