import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Introduction = () => {

   const sentences = [
    "Secure your digital life with our advanced password manager.",
    "Easily store, generate, and manage all your passwords safely.",
    "Protect your online accounts with industry-level encryption."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === sentences.length - 1) return prev;
        return prev + 1;
      });
    }, 2000); // show next sentence every 2 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] overflow-hidden">
      <div className="h-screen w-full flex items-center justify-center px-3 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
             <h1 className="text-3xl font-bold mb-3">
          <span className="text-[#D97706]">&lt;</span>
          <span className="text-[#FEFAE0]">Pass</span>
          <span className="text-[#D97706]">Protect</span>
          <span className="text-[#D97706]">/&gt;</span>
        </h1>
           <p className="text-sm md:text-xl lg:text-2xl text-gray-300 mx-auto font-light leading-relaxed font-['Times_New_Roman']">

              {sentences.map((sentence, index) => (
                <span
                  key={index}
                  className={`block transition-opacity duration-700 
                  ${index <= currentIndex ? "opacity-100" : "opacity-0"}`}
                >
                  {sentence}
                </span>
              ))}

            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="bg-[#1E293B]/60 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-lg">
              <div className="text-2xl md:text-4xl mb-4">🔐</div>
              <h3 className="text-lg md:text-xl font-semibold text-[#FEFAE0] mb-2">Secure Storage</h3>
              <p className="text-sm md:text-base text-gray-300">Your passwords are encrypted and stored securely with industry-standard protection.</p>
            </div>

            <div className="bg-[#1E293B]/60 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-lg">
              <div className="text-2xl md:text-4xl mb-4">⚡</div>
              <h3 className="text-lg md:text-xl font-semibold text-[#FEFAE0] mb-2">Easy Access</h3>
              <p className="text-sm md:text-base text-gray-300">Access your passwords anytime, anywhere with our intuitive interface.</p>
            </div>

            <div className="bg-[#1E293B]/60 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-lg">
              <div className="text-2xl md:text-4xl mb-4">🔄</div>
              <h3 className="text-lg md:text-xl font-semibold text-[#FEFAE0] mb-2">Auto Generate</h3>
              <p className="text-sm md:text-base text-gray-300">Generate strong, unique passwords automatically for maximum security.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <Link
              to="/home"
              className="px-4 md:px-8 py-3 bg-linear-to-r from-[#1E3A8A] to-[#D97706] rounded-full text-white font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 text-sm md:text-base"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-4 md:px-8 py-3 border-2 border-[#D97706] rounded-full text-[#D97706] font-semibold hover:bg-[#D97706] hover:text-white transition-all duration-300 text-sm md:text-base"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
