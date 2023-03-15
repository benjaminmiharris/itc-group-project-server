const Ajv = require("ajv");
const ajv = new Ajv();

module.exports.PropertyValidation = ajv.compile({
  type: "object",
  properties: {
    city: { type: "string", minLength: 3 },
    price: { type: ["number", "string"] },
    bedrooms: { type: ["number", "string"] },
    bathrooms: { type: ["number", "string"] },
    size: { type: ["number", "string"] },
    carpark: { type: "boolean" },
    property_type: {
      type: "array",
      items: {
        type: "string",
        enum: ["Rent", "Buy"],
      },
    },
    listing_type: {
      type: "array",
      items: {
        type: "string",
        enum: ["Apartment", "House", "Duplex"],
      },
    },
    description: { type: "string" },
  },
  required: [
    "city",
    "price",
    "bedrooms",
    "size",
    "property_type",
    "listing_type",
  ],
  additionalProperties: false,
});

// const testerObject = {
//   city: "New York",
//   price: 2000,
//   bedrooms: "2",
//   bathrooms: 2,
//   size: "1000",
//   carpark: true,
//   property_type: ["Rent"],
//   listing_type: ["Apartment"],
//   description: "Spacious apartment in the heart of the city",
// };

// console.log(PropertyValidation(testerObject));
