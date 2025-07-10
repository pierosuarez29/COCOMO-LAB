import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calcularCocomo81, calcularCocomo81Intermedio } from "../utils/cocomo81";
import { CocomoInputs, CocomoResult } from "../types/cocomo81";
import { cocomo81CostDrivers, FactorNivel, gruposCocomo81 } from "../data/cocomo81Factors";
import { factoresAlbrecht } from "../data/albrechtFactors";
import { motion } from "framer-motion";
import { exportarPDF } from "../utils/exportarPDF";

const FormularioCocomo81Elegante = () => {
  const navigate = useNavigate();
  const nombreProyecto = sessionStorage.getItem("nombreProyecto") || "Sin nombre";

  const [inputs, setInputs] = useState<CocomoInputs>({ kloc: 0, mode: "orgánico" });
  const [usarIntermedio, setUsarIntermedio] = useState(false);
  const [factores, setFactores] = useState<Record<string, FactorNivel>>({});
  const [resultado, setResultado] = useState<CocomoResult | null>(null);
  const [tab, setTab] = useState<"kloc" | "pf">("kloc");
  const [ajustes, setAjustes] = useState<number[]>(Array(14).fill(3)); // valor neutro


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
      className="flex flex-col lg:flex-row w-full h-full overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Panel Izquierdo */}
      <div className="w-full lg:w-2/5 pl-4 pr-4 pb-4 border-b lg:border-b-0 lg:border-r border-gray-200">
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

        {/* Tabs de entrada */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-t-lg text-sm font-medium ${
              tab === "kloc"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setTab("kloc")}
            type="button"
          >
            🧮 Ingresar KLOC
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg text-sm font-medium ${
              tab === "pf"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setTab("pf")}
            type="button"
          >
            🧾 Puntos de Función
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "kloc" && (
            <div>
              <label className="text-sm font-medium block mb-1">Tamaño del proyecto (KLOC)</label>
              <input
                type="number"
                name="kloc"
                min={0}
                step={0.01}
                className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
                value={inputs.kloc}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {tab === "pf" && (
  <div className="space-y-4 border border-indigo-200 rounded-xl p-4">
    <h3 className="text-sm font-bold text-indigo-700">Entradas para Puntos de Función</h3>

    <div className="space-y-2">
      {[
        { nombre: "Archivos Lógicos Internos (ALI)", clave: "ALI" },
        { nombre: "Archivos de Interfaz Externa (AIE)", clave: "AIE" },
        { nombre: "Entradas Externas (EE)", clave: "EE" },
        { nombre: "Salidas Externas (SE)", clave: "SE" },
        { nombre: "Consultas Externas (CE)", clave: "CE" },
      ].map((componente) => (
        <div key={componente.clave} className="flex flex-col sm:flex-row gap-2 items-center">
          <label className="w-full sm:w-2/5 text-sm text-gray-700">{componente.nombre}</label>
          <input
            type="number"
            min={0}
            className="w-24 px-2 py-1 border rounded-xl text-sm"
            placeholder="Cantidad"
            name={`cantidad-${componente.clave}`}
          />
          <select className="w-36 px-2 py-1 border rounded-xl text-sm" name={`complejidad-${componente.clave}`}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      ))}
    </div>

    {/* Panel de Factores de Ajuste de Albrecht */}
<div className="mt-6 border border-indigo-200 rounded-xl p-4 space-y-4">
  <h3 className="text-sm font-bold text-indigo-700 mb-2">Factores de Ajuste (Albrecht)</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {factoresAlbrecht.map((nombre, index) => (
      <div key={index} className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">{index + 1}. {nombre}</label>
        <select
          className="px-2 py-1 border rounded-lg text-sm"
          value={ajustes[index] || 3}
          onChange={(e) => {
            const nuevos = [...ajustes];
            nuevos[index] = parseInt(e.target.value);
            setAjustes(nuevos);
          }}
        >
          {[1, 2, 3, 4, 5].map((v) => (
            <option key={v} value={v}>{v} - {[
              "Ninguna", "Baja", "Media", "Alta", "Esencial"
            ][v - 1]}</option>
          ))}
        </select>
      </div>
    ))}
  </div>
</div>

  </div>
)}

          <div>
            <label className="text-sm font-medium block mb-1">Modo del proyecto</label>
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
      <div className={`w-full lg:w-3/5 pl-4 pr-4 pb-4 transition-all duration-500 ${usarIntermedio ? "block" : "hidden lg:block opacity-30 pointer-events-none"}`}>
        <h3 className="text-md font-bold text-center text-gray-700 mb-2 border-b pb-1">
          Factores de Coste (Intermedio)
        </h3>

        <div className="space-y-3">
          {gruposCocomo81.map((grupo) => (
            <div key={grupo.grupo}>
              <h4 className="text-sm font-semibold text-indigo-700">{grupo.grupo}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {grupo.factores.map((id) => {
                  const factor = cocomo81CostDrivers.find((f) => f.id === id);
                  if (!factor) return null;

                  return (
                    <div
                      key={factor.id}
                      className="border p-2 rounded-lg shadow-sm bg-gray-50"
                    >
                      <label className="block mb-1 text-xs font-semibold text-gray-600">
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
