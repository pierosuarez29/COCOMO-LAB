import { useState } from "react";
import SelectorModelo from "../components/SelectorModelo";
import FormularioCocomo81 from "../components/FormularioCocomo81"; // Básico
import FormularioCocomo81Intermedio from "../components/FormularioCocomo81Intermedio"; // Intermedio

function App() {
  const [modelo, setModelo] = useState("");
  const [submodelo, setSubmodelo] = useState("");

  const handleSeleccion = (m: string, s: string) => {
    setModelo(m);
    setSubmodelo(s);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      {!modelo || !submodelo ? (
        <SelectorModelo onSeleccion={handleSeleccion} />
      ) : modelo === "cocomo81" && submodelo === "basico" ? (
        <FormularioCocomo81 onVolver={() => {
          setModelo("");
          setSubmodelo("");
        }} />
      ) : modelo === "cocomo81" && submodelo === "intermedio" ? (
        <FormularioCocomo81Intermedio onVolver={() => {
          setModelo("");
          setSubmodelo("");
        }} />

      ) : (
        <div className="text-center">
          <p className="text-gray-500">Modelo aún no implementado.</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setModelo("");
              setSubmodelo("");
            }}
          >
            Volver
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
