import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#e7dfb5] hover:shadow-md hover:scale-105 hover:text-[#9A3412]"
      >
        Logout
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1E293B]/90 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">
              <span className="text-[#D97706]"></span>
              <span className="text-[#FEFAE0]">Confirm Logout</span>
              <span className="text-[#D97706]"></span>
            </h2>
            <p className="text-center mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-[#D97706] rounded-full hover:bg-[#b45309] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
