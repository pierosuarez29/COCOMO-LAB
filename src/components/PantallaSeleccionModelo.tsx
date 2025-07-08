import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
      className="flex items-center justify-center h-full w-full px-4 scale-[0.9] sm:scale-95 md:scale-100 transition"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-lg text-center space-y-6">
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
            className="px-6 py-3 w-full sm:w-40 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold"
          >
            COCOMO 81
          </button>
          <button
            onClick={() => navigate("/cocomoII")}
            className="px-6 py-3 w-full sm:w-40 bg-neutral-700 text-white rounded-xl hover:bg-neutral-800 transition font-semibold"
          >
            COCOMO II
          </button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline cursor-pointer pt-2"
        >
          ⬅ Volver
        </button>
      </div>
    </motion.div>
  );
};

export default PantallaSeleccionModelo;
