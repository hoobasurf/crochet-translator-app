const fetch = require("node-fetch");

exports.handler = async function(event) {
  try {
    const { text, language } = JSON.parse(event.body);

    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: language,
        format: "text"
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ translation: data.translatedText })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur API de traduction", details: error.message })
    };
  }
};
