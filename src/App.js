import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GeneradorCodigoBarras from './GeneradorCodigoBarras';
import LectorCodigos from './LectorCodigos';
import './App.css';

// Componente Card
const Card = ({ title, bgColor, children }) => (
  <div className="col-md-6">
    <div className="card border-0 rounded-4 shadow-lg animated-card">
      <div className={`card-header ${bgColor} text-white text-center`}>
        <h5 className="card-title">{title}</h5>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            🌍📊 <b>Generador & Lector de Códigos</b> ✨
          </a>
        </div>
      </nav>

      <div className="container my-5">
        <div className="row align-items-center justify-content-around">
          <Card title="🎨 Generador de Códigos de Barras" bgColor="bg-gradient-primary">
            <GeneradorCodigoBarras />
            <p className="text-center mt-3">
              🚀 ¡Genera tu código y prepárate para escanear! 🔍
            </p>
          </Card>

          <Card title="📱 Lector de Códigos de Barras" bgColor="bg-gradient-success">
            <LectorCodigos />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
