import { useEffect } from "react";
import Swal from "sweetalert2";
import { exportarPDF } from "../../utils/exportarPDF";
import { CocomoResult } from "../../types/cocomo81";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface Props {
  resultado: CocomoResult | null;
  onReiniciar: () => void;
  onVolverPaso2: () => void; // Nuevo prop para volver al paso 2
}

const Paso3_Resultados = ({ resultado, onReiniciar, onVolverPaso2 }: Props) => {
  const nombreProyecto = sessionStorage.getItem("nombreProyecto") || "Sin nombre";
  const navigate = useNavigate();


  useEffect(() => {
    if (!resultado) {
      Swal.fire({
        icon: "warning",
        title: "Resultado no disponible",
        text: "Debes completar la estimación en el paso anterior antes de ver los resultados.",
        confirmButtonText: "Volver",
      }).then(() => {
        onReiniciar();
      });
    }
  }, [resultado, onReiniciar]);

  if (!resultado) return null;

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="overflow-y-auto pr-1 space-y-4">
        <div className="flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigate("/modelo")}> 
            <span className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
              <ArrowLeft className="w-4 h-4" /> Volver
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 text-center flex-1 -ml-10">
            Paso 3: Resultados
          </h2>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl text-gray-800 space-y-4 text-lg">
          <p><strong>Esfuerzo estimado:</strong> {resultado.esfuerzo} personas-mes</p>
          <p><strong>Duración estimada:</strong> {resultado.tiempo} meses</p>
          <p><strong>Personas necesarias:</strong> {resultado.personas}</p>
          <p><strong>Costo estimado:</strong> S/. {resultado.costo}</p>
        </div>
      </div>

      <div className="h-16 flex items-center justify-end gap-4 mt-4 px-2 bg-white">
        <button
          onClick={() =>
            exportarPDF({
              nombreProyecto,
              modelo: "COCOMO 81",
              entradas: {},
              resultados: resultado,
            })
          }
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm cursor-pointer"
        >
          📄 Exportar PDF
        </button>

        <button
          onClick={onReiniciar}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-sm cursor-pointer"
        >
          🔄 Volver a editar
        </button>
      </div>
    </div>
  );
};

export default Paso3_Resultados;
