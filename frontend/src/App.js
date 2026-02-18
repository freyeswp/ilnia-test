import React from "react";
import SumCalculator from "./components/SumCalculator";

/**
 * Componente raíz de la aplicación.
 */
function App() {
  return (
      <div style={{ padding: "40px" }}>
        <h2>Calculadora de Suma</h2>
        <SumCalculator />
      </div>
  );
}

export default App;
