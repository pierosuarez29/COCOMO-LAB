import React, { useState } from "react";
import { calcularCocomo81 } from "../utils/cocomo81";
import { CocomoInputs, ProjectMode, CocomoResult } from "../types/cocomo81";

interface FormularioCocomo81Props {
  onVolver: () => void;
}


const FormularioCocomo81 = ({onVolver }: FormularioCocomo81Props) => {
  const [inputs, setInputs] = useState<CocomoInputs>({ kloc: 0, mode: "orgánico" });
  const [resultado, setResultado] = useState<CocomoResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "kloc" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calcularCocomo81(inputs);
    setResultado(res);
  };

  return (
    <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">COCOMO 81 - Básico</h2>
        <button
          onClick={onVolver}
          className="text-sm text-blue-600 hover:underline"
        >
          ⬅ Volver
        </button>
      </div>
    
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Tamaño del proyecto (KLOC)</label>
          <input
            type="number"
            name="kloc"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
            value={inputs.kloc}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Modo del proyecto</label>
          <select
            name="mode"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
            value={inputs.mode}
            onChange={handleChange}
          >
            <option value="orgánico">Orgánico</option>
            <option value="semiacoplado">Semiacoplado</option>
            <option value="empotrado">Empotrado</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
        >
          Calcular estimación
        </button>
      </form>

      {resultado && (
        <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-700 space-y-1">
          <p><strong>Esfuerzo:</strong> {resultado.esfuerzo} personas-mes</p>
          <p><strong>Duración:</strong> {resultado.tiempo} meses</p>
          <p><strong>Personas necesarias:</strong> {resultado.personas}</p>
          <p><strong>Costo estimado:</strong> S/. {resultado.costo}</p>
        </div>
      )}
    </div>
  );
};

export default FormularioCocomo81;
