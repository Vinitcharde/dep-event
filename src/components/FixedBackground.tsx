import React from 'react';

export const FixedBackground: React.FC = () => {
  return (
    <div
      id="app-fixed-background-root"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#040711]"
    >
      {/* Subtle modern ambient lighting nodes */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[140px]" />
      <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full bg-purple-600/8 blur-[140px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,7,17,0.7)_100%)]" />
    </div>
  );
};
