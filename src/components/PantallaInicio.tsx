import React, { useState } from "react";

interface PantallaInicioProps {
  onIniciar: (nombreProyecto: string, modelo: string, submodelo: string) => void;
}
type Modelo = "ninguno" | "cocomo81" | "cocomoII";
type SubModelo = "" | "basico" | "intermedio" | "post-arquitectura";

const PantallaInicio = ({ onIniciar }: PantallaInicioProps) => {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [modelo, setModelo] = useState("");
  const [submodelo, setSubmodelo] = useState("");

  const handleModelo = (value: Modelo) => {
    setModelo(value);
    setSubmodelo("");
  };

  const handleSubmodelo = (value: SubModelo) => {
    setSubmodelo(value);
  };



  const iniciar = () => {
    if (!nombreProyecto.trim() || !modelo) return;
    onIniciar(nombreProyecto.trim(), modelo, submodelo);
  };

  return (
    <div className="flex flex-col justify-center h-full space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-center text-gray-800">COCOMO_LAB</h1>

      <div className="space-y-4 max-w-sm mx-auto w-full">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Nombre del proyecto</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
          />
        </div>

        {/* <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Modelo a utilizar</label>
          <select
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          >
            <option value="">-- Seleccionar --</option>
            <option value="cocomo81">COCOMO 81</option>
            <option value="cocomoII">COCOMO II</option>
          </select>
        </div> */}

        
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



        <button
          onClick={iniciar}
          className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Iniciar estimación
        </button>
      </div>
    </div>
  );
};

export default PantallaInicio;
