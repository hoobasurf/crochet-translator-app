// netlify/functions/translate.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { text, targetLang } = JSON.parse(event.body || '{}');

  if (!text || !targetLang) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Texte ou langue cible manquante.' })
    };
  }

  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|${targetLang}`);
    const data = await response.json();
    const translatedText = data.responseData.translatedText;

    return {
      statusCode: 200,
      body: JSON.stringify({ translatedText })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur API' })
    };
  }
};
