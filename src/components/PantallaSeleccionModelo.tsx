import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

const PantallaSeleccionModelo = () => {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const nombre = sessionStorage.getItem("nombreProyecto");
    if (nombre) setNombreProyecto(nombre);
    else navigate("/nombre");
  }, [navigate]);

  return (
    <motion.div
      className="h-9/10 w-full bg-white flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      

      <div className="bg-white rounded-2xl w-full max-w-lg p-8 text-center relative space-y-6">
        {/* Botón volver dentro del cuadro */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">COCOMO-LAB</h1>
        <p className="text-gray-600 text-base md:text-lg">
          Estima el costo de tu proyecto de manera rápida y fácil
        </p>

        <div className="space-y-1">
          <p className="text-xl font-semibold text-indigo-700">{nombreProyecto}</p>
          <p className="text-sm text-gray-600">Elige la versión que deseas usar</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button
            onClick={() => navigate("/cocomo81")}
            className="px-6 py-3 w-full sm:w-40 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold cursor-pointer"
          >
            COCOMO 81
          </button>
          <button
            onClick={() => navigate("/cocomoII")}
            className="px-6 py-3 w-full sm:w-40 bg-neutral-700 text-white rounded-xl hover:bg-neutral-800 transition font-semibold cursor-pointer"
          >
            COCOMO II
          </button>
        </div>

        <div className="pt-2 text-sm text-gray-600">
          Deseo estimar con{" "}
          <button
            onClick={() => navigate("/casos-uso")}
            className="text-blue-600 underline hover:text-blue-700 cursor-pointer"
          >
            Puntos de caso de uso
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PantallaSeleccionModelo;
