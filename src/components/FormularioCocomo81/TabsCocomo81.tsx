import { useState } from "react";
import Paso1_TamanoSoftware from "./Paso1_TamanoSoftware";
import Paso2_Estimacion from "./Paso2_Estimacion";
import Paso3_Resultados from "./Paso3_Resultados";

const TabsCocomo81 = () => {
  const [paso, setPaso] = useState(1);
  const [klocFinal, setKlocFinal] = useState<number>(0); // valor que viene de PF o ingreso directo
  const [resultados, setResultados] = useState<any>(null); // resultado del cálculo
  const [entradas, setEntradas] = useState<Record<string, any>>({});


  const cambiarPaso = (nuevoPaso: number) => setPaso(nuevoPaso);

  const tabs = ["Tamaño del Software", "Estimación", "Resultados"];

  return (
    <div className="w-full h-full flex flex-col pl-4 pr-4 pt-2">

    {/* Encabezado superior con proyecto, tabs y versión */}
<div className="flex flex-wrap items-center justify-between mb-3 gap-4">
  {/* Proyecto */}
  <div className="text-3xl text-gray-800 font-bold whitespace-nowrap">
  Proyecto: <span className="text-indigo-700">{sessionStorage.getItem("nombreProyecto") || "Sin nombre"}</span>
</div>


  {/* Tabs visuales */}
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
    COCOMO 81
  </div>
</div>


      {/* Contenido del paso */}
      <div className="bg-white p-4 rounded-xl shadow-md flex-1 overflow-auto">
        {paso === 1 && (
          <Paso1_TamanoSoftware
            onNext={(klocCalculado) => {
              setKlocFinal(klocCalculado);
              cambiarPaso(2);
            }}
          />
        )}
        {paso === 2 && (
          <Paso2_Estimacion
  kloc={klocFinal}
  onResultado={(res, datosEntrada) => {
    setResultados(res);
    setEntradas(datosEntrada);
    cambiarPaso(3);
  }}
  onVolver={() => cambiarPaso(1)}
/>

        )}
        {paso === 3 && (
          <Paso3_Resultados
  resultado={resultados}
  entradas={entradas}
  onReiniciar={() => cambiarPaso(1)}
/>

        )}
      </div>
    </div>
  );
};

export default TabsCocomo81;
