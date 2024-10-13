import React, { useState } from 'react';
import JsBarcode from 'jsbarcode';

function GeneradorCodigoBarras() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const generateBarcode = () => {
    const canvas = document.createElement('canvas');
    try {
      JsBarcode(canvas, input, { format: "CODE128" });
      setImageUrl(canvas.toDataURL("image/png"));
    } catch (error) {
      alert('Error al generar el código de barras: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Ingresa números o letras ...</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="form-control"
      />
      <button onClick={generateBarcode} className="btn btn-primary my-3">
        Generar Código
      </button>
      {imageUrl && <img src={imageUrl} alt="Barcode" />}
    </div>
  );
}

export default GeneradorCodigoBarras;
