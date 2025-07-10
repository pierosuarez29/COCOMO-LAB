import { useState } from "react";
import Paso1_TamanoSoftwareCocomoII from "./Paso1_TamanoSoftwareCocomoII";
import Paso2_EstimacionCocomoII from "./Paso2_EstimacionCocomoII";
import Paso3_ResultadosCocomoII from "./Paso3_ResultadosCocomoII";

const TabsCocomoII = () => {
  const [paso, setPaso] = useState(1);
  const [klocFinal, setKlocFinal] = useState<number>(0);
  const [resultado, setResultado] = useState<any>(null);
  const [entradas, setEntradas] = useState<Record<string, any>>({});

  const tabs = ["Tamaño del Software", "Estimación", "Resultados"];

  const cambiarPaso = (nuevoPaso: number) => {
    setPaso(nuevoPaso); // ✅ sin validaciones
  };

  return (
    <div className="w-full h-full flex flex-col pl-4 pr-4 pt-2">

      {/* Header superior */}
      <div className="flex flex-wrap items-center justify-between mb-3 gap-4">
        {/* Nombre del proyecto */}
        <div className="text-3xl text-gray-800 font-bold whitespace-nowrap">
          Proyecto: <span className="text-indigo-700">{sessionStorage.getItem("nombreProyecto") || "Sin nombre"}</span>
        </div>

        {/* Tabs navegación */}
        <div className="flex gap-2 flex-1 justify-center min-w-[200px]">
          {tabs.map((titulo, index) => (
            <div
              key={titulo}
              className={`cursor-pointer px-4 py-2 rounded-t-xl border-b-4 text-sm ${
                paso === index + 1
                  ? "border-indigo-600 font-semibold text-indigo-700 bg-white"
                  : "border-transparent bg-gray-100 text-gray-500"
              }`}
              onClick={() => cambiarPaso(index + 1)}
            >
              {titulo}
            </div>
          ))}
        </div>

        {/* Versión */}
        <div className="text-sm text-gray-600 font-medium bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full whitespace-nowrap">
          COCOMO II
        </div>
      </div>

      {/* Contenido del paso actual */}
      <div className="bg-white p-4 rounded-xl shadow-md flex-1 overflow-auto">
        {paso === 1 && (
          <Paso1_TamanoSoftwareCocomoII
            onNext={(klocCalculado) => {
              setKlocFinal(klocCalculado);
              cambiarPaso(2);
            }}
          />
        )}
        {paso === 2 && (
          <Paso2_EstimacionCocomoII
  kloc={klocFinal}
  onResultado={(res, datosEntrada) => {
    setResultado(res);
    setEntradas(datosEntrada);
    cambiarPaso(3);
  }}
  onVolver={() => cambiarPaso(1)}
/>
        )}
        {paso === 3 && (
          <Paso3_ResultadosCocomoII
  resultado={resultado}
  entradas={entradas}
  onReiniciar={() => cambiarPaso(1)}
/>
        )}
      </div>
    </div>
  );
};

export default TabsCocomoII;
