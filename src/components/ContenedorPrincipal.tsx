import React from "react";

interface ContenedorPrincipalProps {
  children: React.ReactNode;
}

const ContenedorPrincipal = ({ children }: ContenedorPrincipalProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-300 flex justify-center items-center overflow-hidden">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[95vw] max-h-[95vh] h-full md:h-[95vh] overflow-auto p-4 md:p-10 transform scale-[0.9] sm:scale-95 md:scale-100 transition duration-300">
        {children}
      </div>
    </div>
  );
};

export default ContenedorPrincipal;
