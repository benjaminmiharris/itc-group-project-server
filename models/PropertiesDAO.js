// const { ObjectId } = require("mongodb");

let propertiesCollection;

module.exports = class PropertiesDAO {
  static async injectDB(connection) {
    if (!connection) return;
    try {
      propertiesCollection = await connection.collection("Properties");
    } catch (e) {
      console.log(
        `Could not establish connection to Properties collection ${e}`
      );
    }
  }

  static async getProperties(query) {
    return await propertiesCollection.find(query).toArray();
  }
};
