require("dotenv").config();
const express = require("express");
const PropertiesController = require("./controllers/PropertiesController");
const { initDB } = require("./models/init");
initDB();

const app = express();

app.post("/test", (req, res) => {
  console.log("Server is working");

  return res.status(200).send({
    success: true,
    message: "successful",
  });
});

app.get("/search", PropertiesController.searchProperties);
app.get("/search/:id", PropertiesController.getSinglePropertyById);

app.listen(3002, async () => {
  console.log("Server is running on port 3002");
});
