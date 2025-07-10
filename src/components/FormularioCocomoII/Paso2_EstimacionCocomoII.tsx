import { useState } from "react";
import { calcularCocomoII } from "../../utils/cocomoII";
import { conductoresEscala, conductoresCoste, gruposConductoresCoste } from "../../data/cocomoIIFactors";
import { CostDriverLevel, ScaleFactorLevel, ResultadoCocomoII } from "../../types/cocomoII";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
  kloc: number;
  onResultado: (res: ResultadoCocomoII) => void;
  onVolver: () => void;
}

const Paso2_EstimacionCocomoII = ({ kloc, onResultado, onVolver }: Props) => {
  const [costoPM, setCostoPM] = useState(1000);
  const [escala, setEscala] = useState<Record<string, ScaleFactorLevel>>({});
  const [coste, setCoste] = useState<Record<string, CostDriverLevel>>({});
  const navigate = useNavigate();

  const estimar = () => {
    const res = calcularCocomoII({ kloc, costoPersonaMes: costoPM, escala, coste });
    onResultado(res);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="overflow-y-auto pr-1 space-y-4">
        {/* Encabezado */}
        <div className="flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigate("/modelo")}>
            <span className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
              <ArrowLeft className="w-4 h-4" /> Volver
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 text-center flex-1 -ml-10">
            Paso 2: Estimación COCOMO II
          </h2>
        </div>

        {/* Entradas principales */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Tamaño del proyecto (KLOC)</label>
            <input
              type="number"
              readOnly
              value={kloc.toFixed(2)}
              className="w-full px-3 py-2 border rounded-xl bg-gray-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Costo por persona-mes (S/)</label>
            <input
              type="number"
              value={costoPM}
              onChange={(e) => setCostoPM(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border rounded-xl"
            />
          </div>
        </div>

        {/* Conductores de Escala */}
        <div className="border rounded-xl p-4 bg-gray-50 space-y-1">
          <h4 className="text-sm font-bold text-indigo-700">Conductores de Escala</h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {conductoresEscala.map((factor) => (
              <div key={factor.id}>
                <label className="text-xs font-medium text-gray-700">{factor.nombre}</label>
                <select
                  className="w-7/9 px-2 py-1 border rounded text-sm"
                  value={escala[factor.id] || "Nominal"}
                  onChange={(e) =>
                    setEscala((prev) => ({ ...prev, [factor.id]: e.target.value as ScaleFactorLevel }))
                  }
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

        {/* Factores de Coste */}
        <div className="border rounded-xl p-4 bg-gray-50 space-y-1">
          <h4 className="text-sm font-bold text-indigo-700">Factores de Coste</h4>
          {gruposConductoresCoste.map((grupo) => (
            <div key={grupo.grupo}>
              <h5 className="text-sm text-gray-700 font-semibold">{grupo.grupo}</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-1">
                {grupo.factores.map((id) => {
                  const factor = conductoresCoste.find((f) => f.id === id);
                  if (!factor) return null;
                  return (
                    <div key={id}>
                      <label className="text-xs font-medium text-gray-600">{factor.nombre}</label>
                      <select
                        className="w-8/9 px-2 py-1 border rounded text-sm"
                        value={coste[id] || "Nominal"}
                        onChange={(e) =>
                          setCoste((prev) => ({ ...prev, [id]: e.target.value as CostDriverLevel }))
                        }
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

      {/* Footer fijo */}
      <div className="h-16 flex items-center justify-between mt-4 px-2 bg-white">
        <button onClick={onVolver} className="text-sm text-blue-600 hover:underline">
          {/* ⭠ Volver a tamaño del software */}
        </button>
        <button
          onClick={estimar}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm"
        >
          Obtener estimación
        </button>
      </div>
    </div>
  );
};

export default Paso2_EstimacionCocomoII;
