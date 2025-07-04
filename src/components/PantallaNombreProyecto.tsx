import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onSiguiente: (nombreProyecto: string) => void;
  onVolver: () => void;
}

const PantallaNombreProyecto = ({ onSiguiente, onVolver }: Props) => {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(false);

  const avanzar = () => {
    if (!nombre.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onSiguiente(nombre.trim());
  };

  return (
    <motion.div
      className="flex flex-col h-full justify-center items-center text-center space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-gray-800 tracking-tight">COCOMO-LAB</h1>
      <p className="text-gray-600 text-lg">
        Estima el costo de tu proyecto de manera rápida y fácil
      </p>

      <div className="w-full max-w-sm space-y-3">
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
        {error && (
          <p className="text-sm text-red-500">Ingresa un nombre válido.</p>
        )}

        <div className="flex justify-between pt-2">
          <button
            onClick={onVolver}
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
