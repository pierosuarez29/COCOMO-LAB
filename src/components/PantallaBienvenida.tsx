import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PantallaBienvenida = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col h-full justify-center items-center text-center space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-gray-800 tracking-tight">COCOMO-LAB</h1>
      <p className="text-gray-600 text-lg">
        Estima el costo de tu proyecto de manera rápida y fácil
      </p>

      <button
        onClick={() => navigate("/nombre")}
        className="mt-4 px-6 py-2 text-lg font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition cursor-pointer"
      >
        Nuevo proyecto
      </button>
    </motion.div>
  );
};

export default PantallaBienvenida;
