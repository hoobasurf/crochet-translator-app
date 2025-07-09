const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Méthode non autorisée" }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const text = body.text;

    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Aucun texte fourni pour la traduction." }),
      };
    }

    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "fr",
        format: "text"
      }),
    });

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Erreur de l'API de traduction." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ translatedText: data.translatedText }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur : " + error.message }),
    };
  }
};
