require("dotenv").config();
const express = require("express");
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

app.listen(3002, async () => {
  console.log("Server is running on port 3002");
});
