import { useState } from "react";
import { calcularCocomo81, calcularCocomo81Intermedio } from "../../utils/cocomo81";
import { CocomoResult } from "../../types/cocomo81";
import { cocomo81CostDrivers, FactorNivel, gruposCocomo81 } from "../../data/cocomo81Factors";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
  kloc: number;
  onResultado: (res: CocomoResult, entradas: Record<string, any>) => void;
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
    const fec = calcularFEC();
    const base = { kloc, mode: modo };
    const resultado = usarIntermedio
      ? calcularCocomo81Intermedio({ ...base, fec })
      : calcularCocomo81(base);

    const entradas: Record<string, any> = {
      KLOC: kloc,
      Modo: modo,
      Modelo: usarIntermedio ? "Intermedio" : "Básico",
    };

    if (usarIntermedio) {
      entradas["FEC"] = fec;
      entradas["Factores seleccionados"] = factores;
    }

    onResultado(resultado, entradas);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="overflow-y-auto pr-1 space-y-4">
        {/* Encabezado y formulario... igual */}
        {/* (sin cambios en esta parte del renderizado visual) */}
      </div>

      {/* Footer fijo */}
      <div className="h-5 flex items-center justify-between mt-4 px-2 bg-white">
        <button></button>
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
