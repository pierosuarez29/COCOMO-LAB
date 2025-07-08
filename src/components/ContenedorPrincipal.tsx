import React from "react";

interface ContenedorPrincipalProps {
  children: React.ReactNode;
}

const ContenedorPrincipal = ({ children }: ContenedorPrincipalProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-300 flex justify-center items-center overflow-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-[1400px]">
        {children}
      </div>
    </div>
  );
};

export default ContenedorPrincipal;
