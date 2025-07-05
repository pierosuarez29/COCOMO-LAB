import React, { useState } from "react";
import ContenedorPrincipal from "./components/ContenedorPrincipal";
import PantallaInicio from "./components/PantallaInicio";
import SelectorModelo from "./components/SelectorModelo";
import FormularioCocomo81 from "./components/FormularioCocomo81";
import FormularioCocomo81Intermedio from "./components/FormularioCocomo81Intermedio";

function App() {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [modelo, setModelo] = useState("");
  const [submodelo, setSubmodelo] = useState("");

  const handleInicio = (nombre: string, modelo: string, submodelo: string) => {
    setNombreProyecto(nombre);
    setModelo(modelo);
    setSubmodelo(submodelo);
  };

  const handleSubmodelo = (sub: string) => {
    setSubmodelo(sub);
  };

  const volverInicio = () => {
    setNombreProyecto("");
    setModelo("");
    setSubmodelo("");
  };

  return (
    <ContenedorPrincipal>
      {!modelo ? (
        <PantallaInicio onIniciar={handleInicio} />
      ) : modelo === "cocomo81" && submodelo === "basico" ? (
        <FormularioCocomo81 onVolver={() => setModelo("")} />
      ) : modelo === "cocomo81" && submodelo === "intermedio" ? (
        <FormularioCocomo81Intermedio onVolver={() => setModelo("")} />
      ) : (
        <div className="text-center space-y-4">
          <p className="text-gray-600">Este modelo aún no ha sido implementado.</p>
          <button
            onClick={volverInicio}
            className="text-blue-600 hover:underline"
          >
            ⬅ Volver al inicio
          </button>
        </div>
      )}
    </ContenedorPrincipal>
  );
}

export default App;
