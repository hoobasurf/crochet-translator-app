const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: '/tmp' });

const DEEPL_KEY = process.env.DEEPL_KEY; 
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';

const tesseract = require('tesseract.js');
const OCR = async (buffer) => {
  const { data: { text } } = await tesseract.recognize(buffer, 'eng');
  return text;
};

exports.handler = (event, context) => new Promise((resolve, reject)=> {
  const contentType = event.headers['content-type'] || event.headers['Content-Type'];
  if (contentType?.startsWith('multipart/form-data')) {
    // Handle file upload
    upload.single('file')( { headers:event.headers, body:event.body }, {}, async ()=>{
      const file = event.body.file;
      const buffer = fs.readFileSync(file.path);
      const text = await OCR(buffer);
      const t = await translate(text);
      resolve({ statusCode:200, body: JSON.stringify({ translatedText: t }) });
    });
  } else {
    // JSON body
    const d = JSON.parse(event.body);
    if (d.type==='text') return translate(d.text).then(t=>resolve({statusCode:200,body:JSON.stringify({translatedText:t})}));
    if (d.type==='url') {
      const res = await fetch(d.url);
      const buf = await res.buffer();
      const text = await OCR(buf);
      const t = await translate(text);
      return resolve({statusCode:200,body:JSON.stringify({translatedText:t})});
    }
    resolve({statusCode:400,body:'{"error":"type manquant"}'});
  }

  async function translate(text){
    const params = new URLSearchParams();
    params.append('auth_key', DEEPL_KEY);
    params.append('text', text);
    params.append('target_lang', 'FR');
    const r = await fetch(DEEPL_URL, { method:'POST', body: params });
    const js = await r.json();
    return js.translations[0].text;
  }
});
