import { useState } from "react";
import { motion } from "framer-motion";
import { conductoresEscala, conductoresCoste, Nivel } from "../data/cocomoIIFactors";
import { calcularCocomoII } from "../utils/cocomoII";
import { ResultadoCocomoII } from "../types/cocomoII";
import { exportarPDF } from "../utils/exportarPDF";


interface Props {
  nombreProyecto: string;
  onVolver: () => void;
}

const FormularioCocomoII = ({ nombreProyecto, onVolver }: Props) => {
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
    setMostrarEscala(false); // colapsar escala
};


  return (
    <motion.div
      className="flex h-full w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Panel Izquierdo */}
      <div className="w-2/3 pr-6 border-r border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Proyecto: {nombreProyecto}</h2>
            <p className="text-sm text-gray-500">COCOMO II - Post-Arquitectura</p>
          </div>
          <button onClick={onVolver} className="text-sm text-blue-600 hover:underline cursor-pointer">
            ⬅ Volver
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
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

            <div className="w-1/2">
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

          {/* <h3 className="text-sm font-semibold text-gray-600 pt-4">Conductores de Escala</h3>
          <div className="grid grid-cols-2 gap-3">
            {conductoresEscala.map((factor) => (
              <div key={factor.id}>
                <label className="block text-xs font-medium text-gray-700 mb-1">{factor.nombre}</label>
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
          </div> */}
            <div className="pt-4">
  <div
    onClick={() => setMostrarEscala((prev) => !prev)}
    className="text-sm font-semibold text-gray-600 flex justify-between items-center cursor-pointer select-none"
  >
    <span>Conductores de Escala</span>
    <span className="text-xs text-indigo-600">{mostrarEscala ? "Ocultar ▲" : "Mostrar ▼"}</span>
  </div>

  {mostrarEscala && (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {conductoresEscala.map((factor) => (
        <div key={factor.id}>
          <label className="block text-xs font-medium text-gray-700 mb-1">{factor.nombre}</label>
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

      {/* Panel Derecho - Factores de coste */}
      <div className="w-1/3 pl-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Factores de Coste</h3>
        <div className="grid grid-cols-1 gap-3 h-[90%] overflow-y-auto pr-2">
          {conductoresCoste.map((factor) => (
            <div key={factor.id}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{factor.nombre}</label>
              <select
                value={coste[factor.id] || "Nominal"}
                onChange={(e) => handleCoste(factor.id, e.target.value as Nivel)}
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
      </div>
    </motion.div>
  );
};

export default FormularioCocomoII;
