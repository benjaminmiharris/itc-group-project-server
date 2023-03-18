require("dotenv").config();
const express = require("express");
const PropertiesController = require("./controllers/PropertiesController");
const userController = require('./controllers/userController');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { initDB } = require("./models/init");
const {
    S3PropertyUploadMiddleware,
} = require("./middlewares/S3PropertyImageUpload");

initDB();
const express = require('express');
const app = express();
app.use(express.json());

const multer = require("multer");
const { addProperty } = require("./controllers/PropertiesController");
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
app.post(
    "/create-property",
    [upload.single("image"), S3PropertyUploadMiddleware],
    PropertiesController.addProperty
);

// checked
app.post('/register', userController.register);
// cheked
app.post('/login', userController.login);
//  cheked --whitout .param
app.put('/resetPassword', userController.resetPassword);
// cheked --whitout .param | sendingx2
app.get('/getUserById', userController.getUserById);
// cheked --whitout .param | sendingx2
app.put('/updateUser', userController.updateUser);
// cheked --whitout .param
app.delete('/deleteUser', userController.deleteUserByEmail);
// checked 
app.put('/updateUserProperty', userController.updateUserProperty);




app.listen(3002, async () => {
    console.log("Server is running on port 3002");
});
