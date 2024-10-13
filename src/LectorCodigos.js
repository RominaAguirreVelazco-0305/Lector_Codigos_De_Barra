import React, { useEffect, useState } from 'react';
import Quagga from '@ericblade/quagga2';

function LectorCodigos() {
  const [codigo, setCodigo] = useState('');
  const [escaneando, setEscaneando] = useState(true);

  useEffect(() => {
    if (escaneando) {
      Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#lector'),
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // Uso de la cámara trasera
          },
        },
        decoder: {
          readers: ['code_128_reader'],
        },
      }, (err) => {
        if (err) {
          console.error('Error al iniciar Quagga:', err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected((result) => {
        setCodigo(result.codeResult.code);
        setEscaneando(false);
        Quagga.stop();
        handleSuccessfulScan();  // Añadido para gestionar la animación de éxito
      });
    }

    return () => {
      Quagga.offDetected();
    };
  }, [escaneando]);

  // Función para manejar el efecto visual de un escaneo exitoso
  const handleSuccessfulScan = () => {
    const lectorContainer = document.getElementById('lector');
    lectorContainer.classList.add('scan-success');
    setTimeout(() => {
      lectorContainer.classList.remove('scan-success');
    }, 1000);
  };

  const reiniciarEscaneo = () => {
    setCodigo('');
    setEscaneando(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <div
        id="lector"
        style={{
          width: '100%',
          maxWidth: '600px',
          height: '350px',
          backgroundColor: '#000',
          margin: '0 auto',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Visualización del video */}
        <video
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          autoPlay
        />
      </div>

      {codigo ? (
        <div
          style={{
            marginTop: '15px',
            backgroundColor: '#2d2d2d',
            color: '#00e676',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '1.5rem',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '15px auto',
          }}
        >
          📦 Código Detectado: <strong>{codigo}</strong>
        </div>
      ) : (
        <div
          style={{
            marginTop: '15px',
            color: '#aaa',
            fontSize: '1rem',
            textAlign: 'center',
          }}
        >
          📸 Escaneando código... Por favor, mantén el código en el cuadro.
        </div>
      )}

      {codigo && (
        <button
          onClick={reiniciarEscaneo}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            maxWidth: '200px',
            margin: '15px auto',
            display: 'block',
          }}
        >
          🔄 Reiniciar Escaneo
        </button>
      )}
    </div>
  );
}

export default LectorCodigos;
