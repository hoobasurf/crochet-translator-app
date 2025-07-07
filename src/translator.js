import axios from 'axios';

const translateText = async (text, from = 'en', to = 'fr') => {
  try {
    const res = await axios.post('https://libretranslate.com/translate', {
      q: text,
      source: from,
      target: to,
      format: 'text'
    }, {
      headers: { accept: 'application/json' }
    });
    return res.data.translatedText;
  } catch (err) {
    console.error('Erreur de traduction :', err);
    return '❌ Erreur de traduction';
  }
};

export default translateText;
