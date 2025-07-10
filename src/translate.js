function translateImage() {
  const imageUrl = document.getElementById("imageUrl").value;
  const imageFile = document.getElementById("imageUpload").files[0];

  const formData = new FormData();
  if (imageUrl) formData.append("imageUrl", imageUrl);
  if (imageFile) formData.append("imageFile", imageFile);

  document.getElementById("translatedText").innerText = "Analyse de l’image…";

  fetch("/.netlify/functions/translate", {
    method: "POST",
    body: formData,
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("translatedText").innerText = data.text || "Aucun texte détecté.";
  })
  .catch(err => {
    console.error(err);
    document.getElementById("translatedText").innerText = "Erreur de traduction.";
  });
}
