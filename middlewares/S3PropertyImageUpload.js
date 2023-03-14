const AWS = require("aws-sdk");
const uuid = require("uuid").v4;

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

module.exports.S3PropertyUploadMiddleware =
  async function S3PropertyUploadMiddleware(req, res, next) {
    const file = req.file;

    console.log(file);

    try {
      if (typeof file === "undefined") {
        next();
      }

      const s3Params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `uploads/${uuid()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await s3.upload(s3Params, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        next();
      });
    } catch (e) {
      console.log(e);
    }
  };
