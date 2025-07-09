const fetch = require("node-fetch");

const unitsMap = {
  inch: "pouce",
  inches: "pouces",
  in: "po",
  ft: "pied",
  feet: "pieds",
  yard: "yard",
  yards: "yards",
  cm: "cm",
  mm: "mm",
  kg: "kg",
  g: "g",
  oz: "oz",
  lb: "livre",
  lbs: "livres",
  "°F": "degrés Fahrenheit",
  "°C": "degrés Celsius",
};

function replaceUnits(text) {
  return text.replace(
    /\b(?:inches|inch|in|ft|feet|yard|yards|cm|mm|kg|g|oz|lb|lbs|°F|°C)\b/g,
    (match) => unitsMap[match] || match
  );
}

exports.handler = async function (event) {
  try {
    const body = JSON.parse(event.body);
    const inputText = body.text;
    const targetLang = body.target || "fr";

    if (!inputText) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Texte manquant" }),
      };
    }

    const enrichedText = replaceUnits(inputText);

    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: enrichedText,
        source: "auto",
        target: targetLang,
        format: "text",
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ translatedText: data.translatedText }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur de traduction", details: error.message }),
    };
  }
};
