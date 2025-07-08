import React from "react";

interface ContenedorPrincipalProps {
  children: React.ReactNode;
}

const ContenedorPrincipal = ({ children }: ContenedorPrincipalProps) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <div className="w-[1400px] h-[800px] bg-white rounded-3xl shadow-2xl p-10 overflow-hidden relative transition-all duration-500 ease-in-out">
        {children}
      </div>
    </div>
  );
};

export default ContenedorPrincipal;
