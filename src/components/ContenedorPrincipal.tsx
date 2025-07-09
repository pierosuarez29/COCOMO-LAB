import React from "react";

interface ContenedorPrincipalProps {
  children: React.ReactNode;
}

const ContenedorPrincipal = ({ children }: ContenedorPrincipalProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-300 flex justify-center items-center overflow-hidden">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[99vw] max-h-[99vh] h-full md:h-[98vh] overflow-auto pl-3 pr-3 pt-3 md:pl-5 md:pr-5 transform scale-[0.9] sm:scale-95 md:scale-100 transition duration-300">
        {children}
      </div>
    </div>
  );
};

export default ContenedorPrincipal;
