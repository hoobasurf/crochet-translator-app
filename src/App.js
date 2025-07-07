import React, { useState } from 'react';
import translateText from './translator';
import convertMeasurements from './converter';
import './App.css';

function App() {
  const [texte, setTexte] = useState('');
  const [resultat, setResultat] = useState('');

  const handleTranslate = async () => {
    const traduit = await translateText(texte, 'en', 'fr');
    const converti = convertMeasurements(traduit);
    setResultat(converti);
  };

  return (
    <div className="app" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🧶 Traducteur Crochet</h1>
      <textarea
        rows="10"
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        placeholder="Colle ici ton tuto en anglais..."
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
      />
      <br />
      <button
        onClick={handleTranslate}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#ff7eb9',
          border: 'none',
          color: 'white',
          borderRadius: '5px'
        }}
      >Traduire et Convertir</button>
      <h2 style={{ marginTop: '30px' }}>🔁 Résultat :</h2>
      <div style={{ whiteSpace: 'pre-wrap', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
        {resultat}
      </div>
    </div>
  );
}

export default App;
