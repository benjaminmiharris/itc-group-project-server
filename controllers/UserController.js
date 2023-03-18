const userDAO = require('../dao/userDAO');
const propertyDAO = require('../models/propertyDAO')

const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, mobile, role } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword || !mobile || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  const existingUser = await userDAO.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists with this email' });
  }
  const newUser = await userDAO.createUser({ firstName, lastName, email, password, confirmPassword, mobile, role });
  res.status(201).json(newUser);
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userDAO.getUserByEmail(email, password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: "Invalid username or password" });
  }
};


const resetPassword = async (req, res) => {
  const { email } = req.body;
  const { newPassword } = req.body;
  const updatedUser = await userDAO.updateUser(email, { password: newPassword });
  if (updatedUser.error) {
    res.status(500).json({ success: false, message: "An error occurred while resetting password" });
  } else if (!updatedUser) {
    res.status(404).json({ success: false, message: "User not found" });
  } else {
    res.json({ success: true, user: updatedUser });
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userDAO.getUserById(id);
  if (user.error) {
    res.status(500).json({ success: false, message: "An error occurred while retrieving user" });
  } else if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
  } else {
    res.json({ success: true, user });
  }
}

const updateUser = async (req, res) => {
  const { email } = req.body;
  const userData = req.body;
  const updatedUser = await userDAO.updateUser(email, userData);
  if (updatedUser.error) {
    res.status(500).json({ success: false, message: "An error occurred while updating user" });
  } else if (!updatedUser) {
    res.status(404).json({ success: false, message: "User not found" });
  } else {
    res.json({ success: true, user: updatedUser });
  }
}

const deleteUserByEmail = async (req, res) => {
  const { email } = req.body;
  const deletedCount = await userDAO.deleteUserByEmail(email);
  if (deletedCount === 0) {
    res.status(404).json({ success: false, message: "User not found" });
  } else if (deletedCount === 1) {
    res.json({ success: true, message: "User deleted successfully" });
  } else {
    res.status(500).json({ success: false, message: "An error occurred while deleting user" });
  }
}

const updateUserProperty = async (req, res) => {
  const { id } = req.body;
  const { propertyId } = req.body;
  const user = await userDAO.getUserById(id);
  const property = await propertyDAO.getPropertyById(propertyId);

  if (user.error) {
    res.status(500).json({ success: false, message: "An error occurred while retrieving user" });
  } else if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
  } else if (property.error) {
    res.status(500).json({ success: false, message: "An error occurred while retrieving property" });
  } else if (!property) {
    res.status(404).json({ success: false, message: "Property not found" });
  } else {
    const result = await userDAO.updateUserProperty(id, propertyId);
    if (result.error) {
      res.status(500).json({ success: false, message: "An error occurred while updating user" });
    } else {
      res.json({ success: true, message: "User updated successfully" });
    }
  }
};


module.exports =
{
  register,
  login,
  getUserById,
  resetPassword,
  updateUser,
  deleteUserByEmail,
  updateUserProperty
};
