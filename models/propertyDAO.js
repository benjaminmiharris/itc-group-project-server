const { ObjectId } = require("mongodb");

let properties;

module.exports = class PropertiesDAO {
  static async injectDB(connection) {
    if (!connection) return;
    try {
      properties = await connection.collection("Properties");
    } catch (e) {
      console.log(
        `Could not establish connection to Properties collection ${e}`
      );
    }
  }

  static async getProperties(query) {
    return await properties.find(query).toArray();
  }

  static async getPropertyById(propertyId) {
    return await properties.findOne({
      _id: new ObjectId(propertyId),
    });
  }

  static async createProperty(propertyData) {
    propertyData.created_on = new Date();
    await propertiesCollection.insertOne({ ...propertyData });
  }
};
