const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://translate.argosopentech.com/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur API de traduction' })
    };
  }
};
