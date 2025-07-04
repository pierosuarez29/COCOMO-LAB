// src/components/SelectorModelo.tsx
import { useState } from "react";

type Modelo = "ninguno" | "cocomo81" | "cocomoII";
type SubModelo = "" | "basico" | "intermedio" | "post-arquitectura";

interface SelectorModeloProps {
  onSeleccion: (modelo: Modelo, submodelo: SubModelo) => void;
}

const SelectorModelo = ({ onSeleccion }: SelectorModeloProps) => {
  const [modelo, setModelo] = useState<Modelo>("ninguno");
  const [submodelo, setSubmodelo] = useState<SubModelo>("");

  const handleModelo = (value: Modelo) => {
    setModelo(value);
    setSubmodelo("");
  };

  const handleSubmodelo = (value: SubModelo) => {
    setSubmodelo(value);
    onSeleccion(modelo, value);
  };

  return (
    <div className="space-y-4 max-w-xl w-full bg-white p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-bold text-gray-700">Selecciona un modelo</h2>

      <div className="flex gap-4">
        <button
          className={`w-1/2 py-2 rounded-xl text-white font-medium ${
            modelo === "cocomo81" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => handleModelo("cocomo81")}
        >
          COCOMO 81
        </button>
        <button
          className={`w-1/2 py-2 rounded-xl text-white font-medium ${
            modelo === "cocomoII" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => handleModelo("cocomoII")}
        >
          COCOMO II
        </button>
      </div>

      {modelo === "cocomo81" && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Versión de COCOMO 81</p>
          <div className="flex gap-4">
            <button
              className={`w-1/2 py-2 rounded-xl text-white ${
                submodelo === "basico" ? "bg-green-600" : "bg-gray-500"
              }`}
              onClick={() => handleSubmodelo("basico")}
            >
              Básico
            </button>
            <button
              className={`w-1/2 py-2 rounded-xl text-white ${
                submodelo === "intermedio" ? "bg-green-600" : "bg-gray-500"
              }`}
              onClick={() => handleSubmodelo("intermedio")}
            >
              Intermedio
            </button>
          </div>
        </div>
      )}

      {modelo === "cocomoII" && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Versión de COCOMO II</p>
          <div className="flex gap-4">
            <button
              className={`w-full py-2 rounded-xl text-white ${
                submodelo === "post-arquitectura" ? "bg-green-600" : "bg-gray-500"
              }`}
              onClick={() => handleSubmodelo("post-arquitectura")}
            >
              Post-Arquitectura
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectorModelo;
