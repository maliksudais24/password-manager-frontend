import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full py-1 text-center shadow-inner mt-auto text-white font-['Times_New_Roman'] overflow-hidden">
      {/* Background Gradient (same as your site) */}
      <div className="absolute inset-0 z-[-1] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Footer Content */}
      <div className="flex flex-col items-center justify-center space-y-1">
        <div className="flex items-center gap-2 text-lg sm:text-2xl">
          <span className="text-[#D97706]"></span>
          <h2 className="text-sm sm:text-lg font-semibold text-[#FEFAE0]">
          Created by <span className="text-[#D97706]">Sudais</span>
          </h2>
          <span className="text-[#D97706]"></span>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm mt-2">
          © {new Date().getFullYear()} PassProtect — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
