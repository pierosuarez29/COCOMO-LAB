import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calcularCocomo81, calcularCocomo81Intermedio } from "../utils/cocomo81";
import { CocomoInputs, CocomoResult } from "../types/cocomo81";
import { cocomo81CostDrivers, FactorNivel, gruposCocomo81 } from "../data/cocomo81Factors";
import { motion } from "framer-motion";
import { exportarPDF } from "../utils/exportarPDF";

const FormularioCocomo81Elegante = () => {
  const navigate = useNavigate();
  const nombreProyecto = sessionStorage.getItem("nombreProyecto") || "Sin nombre";

  const [inputs, setInputs] = useState<CocomoInputs>({ kloc: 0, mode: "orgánico" });
  const [usarIntermedio, setUsarIntermedio] = useState(false);
  const [factores, setFactores] = useState<Record<string, FactorNivel>>({});
  const [resultado, setResultado] = useState<CocomoResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "kloc" ? parseFloat(value) : value,
    }));
  };

  const handleFactorChange = (id: string, value: FactorNivel) => {
    setFactores((prev) => ({ ...prev, [id]: value }));
  };

  const calcularFEC = () => {
    return cocomo81CostDrivers.reduce((acc, factor) => {
      const seleccion = factores[factor.id] || "Nominal";
      const multiplicador = factor.niveles.find((n) => n.nivel === seleccion)?.valor || 1;
      return acc * multiplicador;
    }, 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fec = calcularFEC();
    const res = usarIntermedio
      ? calcularCocomo81Intermedio({ ...inputs, fec })
      : calcularCocomo81(inputs);
    setResultado(res);
  };

  return (
    <motion.div
      className="flex h-full w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Panel Izquierdo */}
      <div className="w-4/10 pr-6 border-r border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Proyecto: {nombreProyecto}</h2>
            <p className="text-sm text-gray-500">COCOMO 81 - Estimador</p>
          </div>
          <button
            onClick={() => navigate("/modelo")}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            ⬅ Volver
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium">Tamaño del proyecto (KLOC)</label>
              <input
                type="number"
                name="kloc"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
                value={inputs.kloc}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium">Modo del proyecto</label>
              <select
                name="mode"
                className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
                value={inputs.mode}
                onChange={handleChange}
              >
                <option value="orgánico">Orgánico</option>
                <option value="semiacoplado">Semiacoplado</option>
                <option value="empotrado">Empotrado</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input
              type="checkbox"
              id="usarIntermedio"
              checked={usarIntermedio}
              onChange={() => setUsarIntermedio((prev) => !prev)}
              className="accent-indigo-600 scale-110"
            />
            <label htmlFor="usarIntermedio" className="text-sm font-medium text-gray-700">
              Activar modelo intermedio (factores de coste)
            </label>
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
                  modelo: "COCOMO 81",
                  entradas: {
                    KLOC: inputs.kloc,
                    Modo: inputs.mode,
                    "Modelo Intermedio": usarIntermedio ? "Sí" : "No",
                  },
                  resultados: resultado,
                })
              }
              className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm cursor-pointer"
            >
              📄 Exportar PDF
            </button>
          </>
        )}
      </div>

      {/* Panel Derecho - Factores de Coste */}
<div className="w-6/10 pl-6">
  <h3 className="text-md font-bold text-center text-gray-700 mb-4 border-b pb-2">
    Factores de Coste (Intermedio)
  </h3>

  <div className="space-y-6">
    {gruposCocomo81.map((grupo) => (
      <div key={grupo.grupo}>
        <h4 className="text-sm font-semibold text-indigo-700 mb-2">{grupo.grupo}</h4>
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
          {grupo.factores.map((id) => {
            const factor = cocomo81CostDrivers.find((f) => f.id === id);
            if (!factor) return null;

            return (
              <div
                key={factor.id}
                className={`border p-2 rounded-lg shadow-sm bg-gray-50 ${
                  usarIntermedio ? "" : "opacity-40 pointer-events-none"
                }`}
              >
                <label className="block mb-1 ml-0 text-xs font-semibold text-gray-600 ">
                  {factor.nombre}
                </label>
                <select
                  className="w-full px-2 py-1 text-sm border rounded-md focus:outline-none"
                  disabled={!usarIntermedio}
                  value={factores[factor.id] || "Nominal"}
                  onChange={(e) =>
                    handleFactorChange(factor.id, e.target.value as FactorNivel)
                  }
                >
                  {factor.niveles.map((n) => (
                    <option key={n.nivel} value={n.nivel}>
                      {n.nivel} ({n.valor})
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

export default FormularioCocomo81Elegante;
