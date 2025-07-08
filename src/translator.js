export async function translateText(text, language) {
  try {
    const response = await fetch("/.netlify/functions/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language })
    });

    const data = await response.json();
    return data.translation || "Traduction échouée";
  } catch (error) {
    console.error("Erreur dans translateText :", error);
    return "Erreur API";
  }
}
