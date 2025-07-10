const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

exports.handler = async (event) => {
  const multiparty = require('multiparty');
  const form = new multiparty.Form();

  return new Promise((resolve, reject) => {
    form.parse(event, async (err, fields, files) => {
      if (err) return reject({ statusCode: 500, body: "Erreur form" });

      const imageUrl = fields.imageUrl?.[0];
      const imageFile = files.imageFile?.[0];

      let request;
      if (imageUrl) {
        request = { image: { source: { imageUri: imageUrl } } };
      } else if (imageFile) {
        const fs = require('fs');
        const imageBuffer = fs.readFileSync(imageFile.path);
        request = { image: { content: imageBuffer.toString("base64") } };
      } else {
        return resolve({ statusCode: 400, body: "Aucune image reçue" });
      }

      const [result] = await client.textDetection(request);
      const detections = result.textAnnotations;
      const text = detections.length ? detections[0].description : "Aucun texte détecté";

      resolve({
        statusCode: 200,
        body: JSON.stringify({ text }),
      });
    });
  });
};
