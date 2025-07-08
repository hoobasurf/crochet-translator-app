// netlify/functions/translate.js
export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    const res = await fetch('https://translate.argosopentech.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur traduction', details: err.message })
    };
  }
}
