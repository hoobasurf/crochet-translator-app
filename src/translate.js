document.getElementById('translateBtn').addEventListener('click', async () => {
  const text = document.getElementById('sourceText').value.trim();
  const lang = document.getElementById('targetLang').value;

  if (!text) {
    alert("Texte manquant.");
    return;
  }

  const response = await fetch('/.netlify/functions/translate', {
    method: 'POST',
    body: JSON.stringify({ text, target: lang }),
  });

  const data = await response.json();
  document.getElementById('result').innerText = data.translation || "Erreur de traduction.";
});

document.getElementById('ocrBtn').addEventListener('click', async () => {
  const file = document.getElementById('imageInput').files[0];
  if (!file) return alert("Image manquante.");

  const reader = new FileReader();
  reader.onloadend = async () => {
    const response = await fetch('/.netlify/functions/translate', {
      method: 'POST',
      body: JSON.stringify({
        imageBase64: reader.result,
        target: document.getElementById('targetLang').value,
      }),
    });

    const data = await response.json();
    document
