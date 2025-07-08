import React from "react";

interface ContenedorPrincipalProps {
  children: React.ReactNode;
}

const ContenedorPrincipal = ({ children }: ContenedorPrincipalProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-300 flex items-start justify-center overflow-auto py-10 px-4">
      <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl p-8">
        {children}
      </div>
    </div>
  );
};

export default ContenedorPrincipal;
