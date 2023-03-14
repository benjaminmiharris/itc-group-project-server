const PropertiesDAO = require("../models/PropertiesDAO");

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
};
