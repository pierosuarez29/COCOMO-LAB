import { useState } from "react";
import { calcularCocomo81, calcularCocomo81Intermedio } from "../../utils/cocomo81";
import { CocomoResult } from "../../types/cocomo81";
import { cocomo81CostDrivers, FactorNivel, gruposCocomo81 } from "../../data/cocomo81Factors";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
  kloc: number;
  onResultado: (res: CocomoResult) => void;
  onVolver: () => void;
}

const Paso2_Estimacion = ({ kloc, onResultado, onVolver }: Props) => {
  const [usarIntermedio, setUsarIntermedio] = useState(false);
  const [modo, setModo] = useState<"orgánico" | "semiacoplado" | "empotrado">("orgánico");
  const [factores, setFactores] = useState<Record<string, FactorNivel>>({});
  const navigate = useNavigate();

  const calcularFEC = () => {
    return cocomo81CostDrivers.reduce((acc, factor) => {
      const seleccion = factores[factor.id] || "Nominal";
      const multiplicador = factor.niveles.find((n) => n.nivel === seleccion)?.valor || 1;
      return acc * multiplicador;
    }, 1);
  };

  const estimar = () => {
    const base = { kloc, mode: modo };
    const resultado = usarIntermedio
      ? calcularCocomo81Intermedio({ ...base, fec: calcularFEC() })
      : calcularCocomo81(base);
    onResultado(resultado);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="overflow-y-auto pr-1 space-y-4">
        <div className="flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigate("/modelo")}> 
            <span className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 text-center flex-1 -ml-10">
            Paso 2: Estimación COCOMO 81
          </h2>
        </div>

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
            <label className="text-sm font-medium">Modo del proyecto</label>
            <select
              value={modo}
              onChange={(e) => setModo(e.target.value as any)}
              className="w-full px-3 py-2 border rounded-xl"
            >
              <option value="orgánico">Orgánico</option>
              <option value="semiacoplado">Semiacoplado</option>
              <option value="empotrado">Empotrado</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="intermedio"
            checked={usarIntermedio}
            onChange={() => setUsarIntermedio((v) => !v)}
            className="scale-110 accent-indigo-600"
          />
          <label htmlFor="intermedio" className="text-sm font-medium text-gray-700">
            Activar modelo intermedio (factores de coste)
          </label>
        </div>

        {usarIntermedio && (
          <div className="border rounded-xl p-4 bg-gray-50 space-y-4">
            <h4 className="text-sm font-bold text-indigo-700 mb-2">Factores de Coste</h4>
            {gruposCocomo81.map((grupo) => (
              <div key={grupo.grupo}>
                <h5 className="text-sm text-gray-700 font-semibold">{grupo.grupo}</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-1">
                  {grupo.factores.map((id) => {
                    const factor = cocomo81CostDrivers.find((f) => f.id === id);
                    if (!factor) return null;

                    return (
                      <div key={id} className="flex flex-col text-sm">
                        <label className="text-xs font-medium text-gray-600 mb-1">
                          {factor.nombre}
                        </label>
                        <select
                          value={factores[id] || "Nominal"}
                          onChange={(e) =>
                            setFactores((prev) => ({
                              ...prev,
                              [id]: e.target.value as FactorNivel,
                            }))
                          }
                          className="px-2 py-1 border rounded"
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
        )}
      </div>

      {/* Footer fijo con botones */}
      <div className="h-16 flex items-center justify-between mt-4 px-2 bg-white ">
        <button>
        </button>

        <button
          onClick={estimar}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition cursor-pointer"
        >
          Obtener estimación
        </button>
      </div>
    </div>
  );
};

export default Paso2_Estimacion;
