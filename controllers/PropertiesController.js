const PropertiesDAO = require("../models/PropertyDAO");
const { PropertyValidation } = require("../validations/PropertyValidation");

module.exports = class PropertiesController {
  static searchProperties = async (req, res) => {
    // const params = req.query;

    try {
      const results = await PropertiesDAO.getProperties();
      return res.status(200).json({
        success: true,
        results,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `Error retrieving property search data - ${error}`,
      });
    }
  };

  static getSinglePropertyById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await PropertiesDAO.getPropertyById(id);
      return res.status(200).json({
        success: true,
        message: response,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `Error retrieving property ${id} - ${error}`,
      });
    }
  };

  static addProperty = async (req, res) => {
    try {
      const isValid = PropertyValidation(req.body);

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Error creating property as object invalid.",
        });
      }

      const propertyObject = req.body;
      propertyObject.property_image = req.file;

      await PropertiesDAO.createProperty(propertyObject);
      return res
        .status(200)
        .json({ success: true, message: "Property created." });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `Error creating property - ${error}`,
      });
    }
  };

  static deleteSinglePropertyById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await PropertiesDAO.deletePropertyById(id);
      return res.status(200).json({
        success: true,
        message: response,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `Error retrieving property ${id} - ${error}`,
      });
    }
  };

  static updateSinglePropertyById = async (req, res) => {
    const { id } = req.params;
    const propertyObject = req.body;

    try {
      const response = await PropertiesDAO.updatePropertyById(
        id,
        propertyObject
      );
      return res.status(200).json({
        success: true,
        message: response,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `Error retrieving property ${id} - ${error}`,
      });
    }
  };
};
