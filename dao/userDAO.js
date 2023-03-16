const { ObjectId } = require('mongodb');
let users;
let properties;

module.exports = {
  async injectDB(conn) {
    if (users && properties) {
      return;
    }
    try {
      users = await conn.collection('Users');
      properties = await conn.collection('Properties');
    } catch (e) {
      console.error(`Could not establish collection handles in userDAO: ${e}`);
    }
  },

  async createUser(userData) {
    try {
      const result = await users.insertOne(userData);
      return result.ops[0];
    } catch (e) {
      console.error(`Error occurred while creating new user, ${e}`);
      return { error: e };
    }
  },

  async getUserByEmail(email) {
    try {
      const result = await users.findOne({ email });
      return result;
    } catch (e) {
      console.error(`Error occurred while retrieving user with email ${email}, ${e}`);
      return { error: e };
    }
  },

  async getUserById(id) {
    try {
      const result = await users.findOne({ _id: new ObjectId(id) });
      return result;
    } catch (e) {
      console.error(`Error occurred while retrieving user with id ${id}, ${e}`);
      return { error: e };
    }
  },

  async updateUser(email, userData) {
    try {
      if (userData.password && userData.confirmPassword && userData.password !== userData.confirmPassword) {
        return { error: "Passwords do not match" };
      }
      const result = await users.findOneAndUpdate(
        { email },
        { $set: userData },
        { returnOriginal: false }
      );
      return result.value;
    } catch (e) {
      console.error(`Error occurred while updating user with email ${email}, ${e}`);
      return { error: e };
    }
  },
  

  async  deleteUserByEmail(email) {
    try {
      const result = await users.deleteOne({ email });
      return result.deletedCount;
    } catch (e) {
      console.error(`Error occurred while deleting user with email ${email}, ${e}`);
      return { error: e };
    }
  }
  ,

  async updateUserProperty(id, propertyId) {
    try {
      const user = await users.findOne({ _id: new ObjectId(id) });
      const property = await properties.findOne({ _id: new ObjectId(propertyId) });

      if (!user) {
        return { error: `User with id ${id} not found` };
      }

      if (!property) {
        return { error: `Property with id ${propertyId} not found` };
      }

      const result = await users.updateOne(
        { _id: new ObjectId(id) },
        { $set: { property } }
      );

      if (result.modifiedCount === 0) {
        return { error: `Could not update user with id ${id}` };
      }

      return result.modifiedCount;
    } catch (e) {
      console.error(`Error occurred while updating user property with id ${id}, ${e}`);
      return { error: e };
    }
  },
}








