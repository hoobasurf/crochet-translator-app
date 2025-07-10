async function translateText() {
  const text = document.getElementById('textToTranslate').value;
  if (!text.trim()) {
    alert('Veuillez entrer un texte à traduire.');
    return;
  }

  const res = await fetch('/.netlify/functions/translate', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });

  const data = await res.json();
  document.getElementById('translatedText').innerText = data.translation || 'Erreur de traduction.';
}

async function translateFromURL() {
  const url = document.getElementById('urlInput').value.trim();
  if (!url) return alert('Veuillez entrer une URL.');

  const res = await fetch('/.netlify/functions/ocr', {
    method: 'POST',
    body: JSON.stringify({ imageUrl: url }),
  });

  const data = await res.json();
  document.getElementById('resultContainer').innerText = data.translation || 'Erreur.';
}

async function translateImage() {
  const file = document.getElementById('imageInput').files[0];
  if (!file) return alert('Veuillez choisir une image.');

  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('/.netlify/functions/ocr', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  document.getElementById('resultContainer').innerText = data.translation || 'Erreur.';
}
