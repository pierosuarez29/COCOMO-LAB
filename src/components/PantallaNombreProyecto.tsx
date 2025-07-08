import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PantallaNombreProyecto = () => {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const avanzar = () => {
    if (!nombre.trim()) {
      setError(true);
      return;
    }
    setError(false);
    sessionStorage.setItem("nombreProyecto", nombre.trim());
    navigate("/modelo");
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full text-center px-4 scale-[0.9] sm:scale-95 md:scale-100 transition"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-4 md:p-8 rounded-2xl w-full max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-tight">
          COCOMO-LAB
        </h1>
        <p className="text-gray-600 text-base md:text-lg mb-6">
          Estima el costo de tu proyecto de manera rápida y fácil
        </p>

        <div className="space-y-3 text-left">
          <label className="block text-sm font-medium text-gray-700">
            Nombre del proyecto
          </label>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Ej: Sistema Contable UNT"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">Ingresa un nombre válido.</p>}
        </div>

        <div className="flex justify-between items-center pt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            ⬅ Volver
          </button>
          <button
            onClick={avanzar}
            className="px-6 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PantallaNombreProyecto;
