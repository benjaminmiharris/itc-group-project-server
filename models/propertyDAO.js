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
    try {
      return await properties.find(query).toArray();
    } catch (error) {
      console.error(`Error occurred while getting all properties, ${error}`);
      return { error: error };
    }
  }

  static async getPropertyById(propertyId) {
    try {
      return await properties.findOne({
        _id: new ObjectId(propertyId),
      });
    } catch (error) {
      console.error(`Error occurred while getting a property, ${error}`);
      return { error: error };
    }
  }

  static async createProperty(propertyData) {
    try {
      propertyData.created_on = new Date();
      await properties.insertOne({ ...propertyData });
    } catch (error) {
      console.error(`Error occurred while creating new property, ${error}`);
      return { error: error };
    }
  }

  static async deletePropertyById(propertyId) {
    try {
      await properties.deleteOne({
        _id: new ObjectId(propertyId),
      });
    } catch (error) {
      console.error(`Error occurred while deleting a property, ${error}`);
      return { error: error };
    }
  }

  static async updatePropertyById(propertyId, propertyObject) {
    try {
      await properties.findOneAndUpdate(
        { _id: new ObjectId(propertyId) },
        { $set: propertyObject },
        { returnOriginal: false }
      );
    } catch (error) {
      console.error(`Error occurred while updating a property, ${error}`);
      return { error: error };
    }
  }
};
