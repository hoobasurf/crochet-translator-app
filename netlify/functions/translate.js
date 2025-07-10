const fetch = require('node-fetch');
const tesseract = require('tesseract.js');
require('dotenv').config();

const DEEPL_KEY = process.env.DEEPL_KEY;
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';

const OCR = async (buffer) => {
  const { data: { text } } = await tesseract.recognize(buffer, 'eng');
  return text;
};

exports.handler = async (event) => {
  const contentType = event.headers['content-type'] || event.headers['Content-Type'];

  if (contentType && contentType.includes('multipart/form-data')) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Fichiers non gérés dans cette version simplifiée.' })
    };
  }

  const data = JSON.parse(event.body);
  if (!data || !data.text && !data.url) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Données manquantes' }) };
  }

  let sourceText = data.text || '';
  if (data.url) {
    const res = await fetch(data.url);
    const buffer = await res.buffer();
    sourceText = await OCR(buffer);
  }

  const params = new URLSearchParams();
  params.append('auth_key', DEEPL_KEY);
  params.append('text', sourceText);
  params.append('target_lang', 'FR');

  const translation = await fetch(DEEPL_URL, {
    method: 'POST',
    body: params
  }).then(r => r.json());

  return {
    statusCode: 200,
    body: JSON.stringify({ translatedText: translation.translations[0].text })
  };
};
