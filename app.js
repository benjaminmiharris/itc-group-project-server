require("dotenv").config();
const express = require('express');
const app = express();
const { initDB } = require("./init");
initDB();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const userController = require('./controllers/userController');


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




const PORT = 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));