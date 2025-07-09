const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Méthode non autorisée. Utilisez POST." }),
    };
  }

  try {
    const { text, targetLang } = JSON.parse(event.body);

    if (!text || !targetLang) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Texte ou langue cible manquants." }),
      };
    }

    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
        format: "text",
      }),
    });

    const data = await response.json();

    if (data.error || !data.translatedText) {
      return {
        statusCode: 502,
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
