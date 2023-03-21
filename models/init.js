const { MongoClient } = require("mongodb");
const userDAO = require("../dao/userDAO");
const PropertiesDAO = require("./PropertyDAO");

module.exports.initDB = async function initDB() {
  MongoClient.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
    .then(async (connection) => {
      console.log("Connection to DB established");
      await userDAO.injectDB(connection.db(process.env.DB));
      await PropertiesDAO.injectDB(connection.db(process.env.DB));

      return;
    })
    .catch((error) => {
      console.log(error);
      console.log(`DB connection failed ${error}`);
      process.exit(1);
    });
};
