import { useState } from "react";
import { factoresAlbrecht } from "../../data/albrechtFactors";
import { equivalenciaLDCporPF } from "../../data/ldcPorLenguaje";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
  onNext: (kloc: number) => void;
}

const Paso1_TamanoSoftwareCocomoII = ({ onNext }: Props) => {
  const [modo, setModo] = useState<"kloc" | "pf">("kloc");
  const [kloc, setKloc] = useState(0);
  const navigate = useNavigate();

  const [componentes, setComponentes] = useState<Record<string, { cantidad: number; complejidad: string }>>({
    ALI: { cantidad: 0, complejidad: "baja" },
    AIE: { cantidad: 0, complejidad: "baja" },
    EE: { cantidad: 0, complejidad: "baja" },
    SE: { cantidad: 0, complejidad: "baja" },
    CE: { cantidad: 0, complejidad: "baja" },
  });
  const [ajustes, setAjustes] = useState<number[]>(Array(14).fill(3));
  const [lenguaje, setLenguaje] = useState("Java");

  const pesos = {
    ALI: { baja: 7, media: 10, alta: 15 },
    AIE: { baja: 5, media: 7, alta: 10 },
    EE: { baja: 3, media: 4, alta: 6 },
    SE: { baja: 4, media: 5, alta: 7 },
    CE: { baja: 3, media: 4, alta: 6 },
  };

  const calcularPFA = () => {
    const PFSA = Object.entries(componentes).reduce((total, [clave, { cantidad, complejidad }]) => {
      return total + cantidad * pesos[clave as keyof typeof pesos][complejidad as keyof typeof pesos["ALI"]];
    }, 0);
    const FVA = ajustes.reduce((acc, v) => acc + v, 0);
    return PFSA * (0.65 + 0.01 * FVA);
  };

  const calcularKLOC = () => {
    const pfa = calcularPFA();
    const ldcPorPF = equivalenciaLDCporPF.find((l) => l.lenguaje === lenguaje)?.ldcPorPF || 53;
    return parseFloat(((pfa * ldcPorPF) / 1000).toFixed(2));
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
            Paso 1: Tamaño del Software
          </h2>
        </div>

        <div className="flex gap-2">
          <button className={`px-4 py-2 rounded-lg text-sm ${modo === "kloc" ? "bg-indigo-600 text-white" : "bg-gray-200"}`} onClick={() => setModo("kloc")}>Ingresar KLOC</button>
          <button className={`px-4 py-2 rounded-lg text-sm ${modo === "pf" ? "bg-indigo-600 text-white" : "bg-gray-200"}`} onClick={() => setModo("pf")}>Usar Puntos de Función</button>
        </div>

        {modo === "kloc" && (
          <div className="bg-white border border-indigo-200 rounded-xl mt-25 p-6 shadow-md w-full max-w-md mx-auto space-y-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Ingreso directo de KLOC</h3>
            <p className="text-sm text-gray-500">
              Si ya conoces el tamaño del software en miles de líneas de código, ingrésalo aquí.
            </p>

            <div className="flex justify-center">
              <input
                type="number"
                min={0}
                value={kloc}
                onChange={(e) => setKloc(parseFloat(parseFloat(e.target.value).toFixed(2)))}
                className="w-32 px-3 py-2 border rounded-lg text-center text-lg font-medium"
              />
            </div>
          </div>
        )}

        {modo === "pf" && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-indigo-700 mb-2">Componentes de Función</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Object.keys(componentes).map((clave) => (
                  <div key={clave} className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">
                      {clave} <span className="block text-[12px] font-normal text-gray-500">{({
                        ALI: "Archivos Lógicos Internos",
                        AIE: "Archivos de Interfaz Externa",
                        EE: "Entradas Externas",
                        SE: "Salidas Externas",
                        CE: "Consultas Externas",
                      } as any)[clave]}</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min={0}
                        value={componentes[clave].cantidad}
                        onChange={(e) =>
                          setComponentes((prev) => ({
                            ...prev,
                            [clave]: { ...prev[clave], cantidad: parseInt(e.target.value) },
                          }))
                        }
                        className="w-20 px-2 py-1 border rounded-xl text-sm text-center"
                      />
                      <select
                        value={componentes[clave].complejidad}
                        onChange={(e) =>
                          setComponentes((prev) => ({
                            ...prev,
                            [clave]: { ...prev[clave], complejidad: e.target.value },
                          }))
                        }
                        className="w-1/2 px-2 py-1 border rounded-xl text-sm"
                      >
                        {Object.entries(pesos[clave as keyof typeof pesos]).map(([nivel, valor]) => (
                          <option key={nivel} value={nivel}>{nivel.charAt(0).toUpperCase() + nivel.slice(1)} ({valor})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-indigo-700 mb-1">Factores de Ajuste (Albrecht)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {factoresAlbrecht.map((nombre, i) => (
                  <div key={i}>
                    <label className="text-xs">{i + 1}. {nombre}</label>
                    <select
                      value={ajustes[i]}
                      onChange={(e) => {
                        const nuevos = [...ajustes];
                        nuevos[i] = parseInt(e.target.value);
                        setAjustes(nuevos);
                      }}
                      className="w-5/6 px-2 py-1 border rounded-xl text-sm"
                    >
                      {[1, 2, 3, 4, 5].map((v) => (
                        <option key={v} value={v}>
                          {v} - {"Ninguna Baja Media Alta Esencial".split(" ")[v - 1]}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-indigo-700 mb-1">Lenguaje de programación</h4>
              <select
                value={lenguaje}
                onChange={(e) => setLenguaje(e.target.value)}
                className="w-full sm:w-80 px-3 py-2 border rounded-xl"
              >
                {equivalenciaLDCporPF.map((l) => (
                  <option key={l.lenguaje} value={l.lenguaje}>
                    {l.lenguaje} ({l.ldcPorPF} LDC/PF)
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-6">
              <div className="text-center text-lg mb-2 text-indigo-700">
                KLOC estimado: <strong>{calcularKLOC().toFixed(2)} KLOC</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-5 flex items-center justify-between mt-4 px-2 bg-white">
        <p className="text-gray-600 text-sm"></p>
        <button
          onClick={() => onNext(modo === "kloc" ? kloc : calcularKLOC())}
          className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition"
        >
          Siguiente: Elegir modelo de estimación
        </button>
      </div>
    </div>
  );
};

export default Paso1_TamanoSoftwareCocomoII;
