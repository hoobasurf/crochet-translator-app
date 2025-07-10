function translateText() {
  const input = document.getElementById('text-input').value;
  if (!input) return alert('Merci d’entrer un texte.');
  document.getElementById('result').innerText = `[Traduction simulée du texte] → ${input}`;
}

function translateImageURL() {
  const url = document.getElementById('url-input').value;
  if (!url) return alert('Merci d’entrer une URL.');
  document.getElementById('result').innerText = `[Analyse simulée de l’image à l’URL suivante] → ${url}`;
}

function translateImageFile() {
  const file = document.getElementById('image-file').files[0];
  if (!file) return alert('Merci de sélectionner une image.');
  document.getElementById('result').innerText = `[Traduction simulée de l’image sélectionnée : ${file.name}]`;
}
