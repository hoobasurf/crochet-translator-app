const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({
  projectId: 'YOUR_PROJECT_ID',
  key: 'YOUR_API_KEY'
});

exports.handler = async function(event, context) {
  const url = new URLSearchParams(event.body).get('url');
  if (!url) {
    return { statusCode: 400, body: 'Missing YouTube URL' };
  }

  const videoId = url.split('v=')[1]?.split('&')[0];
  if (!videoId) {
    return { statusCode: 400, body: 'Invalid YouTube URL' };
  }

  try {
    const response = await axios.get(`https://yt.lemnoslife.com/videos?part=player&id=${videoId}`);
    const subtitlesRes = await axios.get(`https://yt.lemnoslife.com/captions?part=snippet&videoId=${videoId}`);
    const captions = subtitlesRes.data.items.find(i => i.snippet.language === 'en');
    if (!captions) throw new Error('No captions found');

    const transcriptRes = await axios.get(`https://yt.lemnoslife.com/captions/${captions.id}?tfmt=srv1`);
    const rawText = transcriptRes.data.body;

    const [translation] = await translate.translate(rawText, 'fr');
    return {
      statusCode: 200,
      body: JSON.stringify({ translation })
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
