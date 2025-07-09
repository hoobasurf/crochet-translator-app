async function translateText() {
  const input = document.getElementById("textInput").value;
  const output = document.getElementById("output");

  if (!input.trim()) {
    output.textContent = "Aucun texte à traduire.";
    return;
  }

  output.textContent = "Traduction en cours...";

  const unitFixedText = input
    .replace(/(\d+)\s?cm/g, "$1 centimeters")
    .replace(/(\d+)\s?mm/g, "$1 millimeters")
    .replace(/(\d+)\s?m/g, "$1 meters")
    .replace(/(\d+)\s?g/g, "$1 grams")
    .replace(/(\d+)\s?kg/g, "$1 kilograms");

  const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(unitFixedText)}&langpair=en|fr`);
  const data = await res.json();

  output.textContent = data.responseData.translatedText;
}
