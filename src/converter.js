const convertMeasurements = (text) => {
  return text
    .replace(/(\d+(?:\.\d+)?)\s?inch(es)?/gi, (_, val) => `${(val * 2.54).toFixed(1)} cm`)
    .replace(/(\d+(?:\.\d+)?)\s?oz/gi, (_, val) => `${(val * 28.35).toFixed(1)} g`)
    .replace(/(\d+(?:\.\d+)?)\s?lbs?/gi, (_, val) => `${(val * 0.453592).toFixed(2)} kg`)
    .replace(/(\d+(?:\.\d+)?)\s?yards?/gi, (_, val) => `${(val * 0.9144).toFixed(2)} m`);
};

export default convertMeasurements;
