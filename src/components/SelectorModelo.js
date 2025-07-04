import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/SelectorModelo.tsx
import { useState } from "react";
const SelectorModelo = ({ onSeleccion }) => {
    const [modelo, setModelo] = useState("ninguno");
    const [submodelo, setSubmodelo] = useState("");
    const handleModelo = (value) => {
        setModelo(value);
        setSubmodelo("");
    };
    const handleSubmodelo = (value) => {
        setSubmodelo(value);
        onSeleccion(modelo, value);
    };
    return (_jsxs("div", { className: "space-y-4 max-w-xl w-full bg-white p-6 rounded-xl shadow-xl", children: [_jsx("h2", { className: "text-xl font-bold text-gray-700", children: "Selecciona un modelo" }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { className: `w-1/2 py-2 rounded-xl text-white font-medium ${modelo === "cocomo81" ? "bg-blue-600" : "bg-gray-400"}`, onClick: () => handleModelo("cocomo81"), children: "COCOMO 81" }), _jsx("button", { className: `w-1/2 py-2 rounded-xl text-white font-medium ${modelo === "cocomoII" ? "bg-blue-600" : "bg-gray-400"}`, onClick: () => handleModelo("cocomoII"), children: "COCOMO II" })] }), modelo === "cocomo81" && (_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Versi\u00F3n de COCOMO 81" }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { className: `w-1/2 py-2 rounded-xl text-white ${submodelo === "basico" ? "bg-green-600" : "bg-gray-500"}`, onClick: () => handleSubmodelo("basico"), children: "B\u00E1sico" }), _jsx("button", { className: `w-1/2 py-2 rounded-xl text-white ${submodelo === "intermedio" ? "bg-green-600" : "bg-gray-500"}`, onClick: () => handleSubmodelo("intermedio"), children: "Intermedio" })] })] })), modelo === "cocomoII" && (_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Versi\u00F3n de COCOMO II" }), _jsx("div", { className: "flex gap-4", children: _jsx("button", { className: `w-full py-2 rounded-xl text-white ${submodelo === "post-arquitectura" ? "bg-green-600" : "bg-gray-500"}`, onClick: () => handleSubmodelo("post-arquitectura"), children: "Post-Arquitectura" }) })] }))] }));
};
export default SelectorModelo;
