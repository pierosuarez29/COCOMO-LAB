import { useState } from "react";
import { motion } from "framer-motion";
import {
  conductoresEscala,
  conductoresCoste,
  Nivel,
  gruposConductoresCoste,
} from "../data/cocomoIIFactors";
import { calcularCocomoII } from "../utils/cocomoII";
import { ResultadoCocomoII } from "../types/cocomoII";
import { exportarPDF } from "../utils/exportarPDF";
import { useNavigate } from "react-router-dom";

const FormularioCocomoII = () => {
  const navigate = useNavigate();
  const nombreProyecto = sessionStorage.getItem("nombreProyecto") || "Proyecto sin nombre";

  const [kloc, setKloc] = useState(0);
  const [costoPersonaMes, setCostoPersonaMes] = useState(1000);
  const [escala, setEscala] = useState<Record<string, Nivel>>({});
  const [coste, setCoste] = useState<Record<string, Nivel>>({});
  const [resultado, setResultado] = useState<ResultadoCocomoII | null>(null);
  const [mostrarEscala, setMostrarEscala] = useState(true);

  const handleEscala = (id: string, nivel: Nivel) => {
    setEscala((prev) => ({ ...prev, [id]: nivel }));
  };

  const handleCoste = (id: string, nivel: Nivel) => {
    setCoste((prev) => ({ ...prev, [id]: nivel }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calcularCocomoII({ kloc, costoPersonaMes, escala, coste });
    setResultado(res);
    setMostrarEscala(false);
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row h-full w-full overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Panel Izquierdo */}
      <div className="w-full lg:w-2/5 p-4 lg:pr-6 border-b lg:border-b-0 lg:border-r border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Proyecto: {nombreProyecto}</h2>
            <p className="text-sm text-gray-500">COCOMO II - Post-Arquitectura</p>
          </div>
          <button
            onClick={() => navigate("/modelo")}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            ⬅ Volver
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium block mb-1">Tamaño (KLOC)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={kloc}
                onChange={(e) => setKloc(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium block mb-1">Costo por persona-mes (S/.)</label>
              <input
                type="number"
                min={0}
                value={costoPersonaMes}
                onChange={(e) => setCostoPersonaMes(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
              />
            </div>
          </div>

          {/* Escala en modo colapsable */}
          <div className="pt-4">
            <div
              onClick={() => setMostrarEscala((prev) => !prev)}
              className="text-sm font-semibold text-gray-600 flex justify-between items-center cursor-pointer select-none"
            >
              <span>Conductores de Escala</span>
              <span className="text-xs text-indigo-600">
                {mostrarEscala ? "Ocultar ▲" : "Mostrar ▼"}
              </span>
            </div>

            {mostrarEscala && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 mt-3">
                {conductoresEscala.map((factor) => (
                  <div key={factor.id} className="flex flex-col items-start">
                    <label className="text-xs font-medium text-gray-700 leading-snug mb-1">
                      {factor.nombre}
                    </label>
                    <select
                      value={escala[factor.id] || "Nominal"}
                      onChange={(e) => handleEscala(factor.id, e.target.value as Nivel)}
                      className="w-full px-3 py-2 border rounded-xl focus:outline-none"
                    >
                      {factor.niveles.map((nivel) => (
                        <option key={nivel.nivel} value={nivel.nivel}>
                          {nivel.nivel} ({nivel.valor})
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer"
          >
            Calcular estimación
          </button>
        </form>

        {resultado && (
          <>
            <div className="mt-6 bg-gray-100 p-4 rounded-xl text-sm text-gray-700 space-y-1">
              <p><strong>Esfuerzo:</strong> {resultado.esfuerzo} personas-mes</p>
              <p><strong>Duración:</strong> {resultado.tiempo} meses</p>
              <p><strong>Personas necesarias:</strong> {resultado.personas}</p>
              <p><strong>Costo estimado:</strong> S/. {resultado.costo}</p>
            </div>

            <button
              onClick={() =>
                exportarPDF({
                  nombreProyecto,
                  modelo: "COCOMO II - Post-Arquitectura",
                  entradas: {
                    "Tamaño (KLOC)": kloc,
                    "Costo por persona-mes": costoPersonaMes,
                    ...Object.fromEntries(
                      conductoresEscala.map((f) => [f.nombre, escala[f.id] || "Nominal"])
                    ),
                    ...Object.fromEntries(
                      conductoresCoste.map((f) => [f.nombre, coste[f.id] || "Nominal"])
                    ),
                  },
                  resultados: resultado,
                })
              }
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm cursor-pointer"
            >
              📄 Exportar PDF
            </button>
          </>
        )}
      </div>

      {/* Panel Derecho - Cost Drivers agrupados */}
      <div className="w-full lg:w-3/5 p-4">
        <h3 className="text-md font-bold text-center text-gray-700 mb-4 border-b pb-2">
          Factores de Coste
        </h3>

        <div className="space-y-6">
          {gruposConductoresCoste.map((grupo) => (
            <div key={grupo.grupo}>
              <h4 className="text-sm font-semibold text-indigo-700 mb-2">{grupo.grupo}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {grupo.factores.map((id) => {
                  const factor = conductoresCoste.find((f) => f.id === id);
                  if (!factor) return null;

                  return (
                    <div
                      key={factor.id}
                      className="border p-2 rounded-lg shadow-sm bg-gray-50"
                    >
                      <label className="block mb-1 text-xs font-semibold text-gray-600 text-center">
                        {factor.nombre}
                      </label>
                      <select
                        value={coste[factor.id] || "Nominal"}
                        onChange={(e) => handleCoste(factor.id, e.target.value as Nivel)}
                        className="w-full px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring"
                      >
                        {factor.niveles.map((nivel) => (
                          <option key={nivel.nivel} value={nivel.nivel}>
                            {nivel.nivel} ({nivel.valor})
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FormularioCocomoII;
