import React, { useContext ,useState, useEffect } from 'react';
import {  toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { PasswordContext } from '../contexts/Passwrodcontext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Showpasswords = () => {

  const {passwordList, setPasswordList, editItem, setEditItem, deletePassword, fetchPasswords }= useContext(PasswordContext)
  const Navigate = useNavigate()
  const { user } = useAuth();

// Redirect to introduction if not authenticated
useEffect(() => {
  if (!user) {
    Navigate("/");
  }
}, [user, Navigate]);

// Fetch passwords when component mounts or when user changes
useEffect(() => {
  if (user) {
    fetchPasswords();
  }
}, [user]);

  const [visibilityStates, setVisibilityStates] = useState({});

  // ✅ Toggle individual password visibility
  const togglevisibility = (id) => {
    setVisibilityStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copytext = (text) => {

    navigator.clipboard.writeText(text); // copies to clipboard
  toast.success('Copied to Clipboard!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Bounce,
    style: {
      backgroundColor: "#1E293B", // dark bluish background (matches your theme)
      color: "#D97706",           // orange text (matches your accent color)
      fontWeight: "600",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(217,119,6,0.4)",
    },
    icon: "🔥",
  });

};

const Editpassword = (id) => {
  console.log('edit button is click on ',id)
  const itemedit = passwordList.find((item)=>item.id===id)
  if(itemedit){
    setEditItem(itemedit)
    Navigate("/home")
  }
}
const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

const openDeleteModal = (id) => {
  setDeleteModal({ isOpen: true, id });
};

const closeDeleteModal = () => {
  setDeleteModal({ isOpen: false, id: null });
};

const confirmDelete = async () => {
  if (deleteModal.id) {
    await deletePassword(deleteModal.id);
    closeDeleteModal();
  }
};


  return (
    <>

      {/* Background */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950
        bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Main Container */}
      <div className="flex flex-col items-center mt-10">
        <div className="passwords bg-[#1E293B]/60 backdrop-blur-md p-2 sm:p-4 md:p-8 rounded-2xl
          shadow-lg w-full max-w-sm sm:max-w-2xl md:max-w-4xl text-white
          max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto custom-scrollbar">

          {/* Heading */}
         <h1 className="text-4xl font-bold mb-3 ml-26">
            <span className="text-[#D97706]">&lt;</span>
            <span className="text-[#FEFAE0]">Your's</span>
            <span className="text-[#D97706]">Passwords</span>
            <span className="text-[#D97706]">/&gt;</span>
          </h1>

          {/* If No Passwords */}
          {passwordList.length === 0 ? (
            <div className="text-center text-gray-300">
             <h1 className="text-4xl font-bold mb-3 ml-26">
            <span className="text-[#D97706]">&lt;</span>
            <span className="text-[#FEFAE0]">No </span>
            <span className="text-[#D97706]">Passwords to show ! </span>
            <span className="text-[#D97706]">/&gt;</span>
          </h1>
            </div>
          ) : (
            // ✅ Password Table
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-white min-w-[300px] sm:min-w-[400px] md:min-w-[600px]">
              <thead>
                <tr className="bg-[#334155] text-[#e88c30] text-left">
                  <th className="p-2 sm:p-3 rounded-tl-lg">#</th>
                  <th className="p-2 sm:p-3">Website / App</th>
                  <th className="p-2 sm:p-3">Username</th>
                  <th className="p-2 sm:p-3">Password</th>
                  <th className="p-2 sm:p-3 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordList.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#475569]/50 transition-all duration-200"
                  >
                    <td className="p-2 sm:p-3 wrap-break-words">{index + 1}</td>

                    {/* Website Link */}
                    <td className="p-2 sm:p-3 wrap-break-words">
                      <div className='flex flex-col sm:flex-row gap-1 sm:gap-2'>
                        <a
                          href={item.site.startsWith("http") ? item.site : `https://${item.site}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D97706] hover:underline break-all"
                        >
                          {item.site}
                        </a>
                        <lord-icon
                          src="https://cdn.lordicon.com/hmpomorl.json"
                          trigger="hover"
                          colors="primary:#ffffff,secondary:#e88c30"
                          style={{ width: "18px", height: "18px", cursor: "pointer" }}
                          onClick={() => { copytext(item.site) }}>
                        </lord-icon>
                      </div>
                    </td>

                    {/* Username */}
                    <td className="p-2 sm:p-3 wrap-break-words">
                      <div className='flex flex-col sm:flex-row gap-1 sm:gap-2'>
                        <span className="break-all">{item.username}</span>
                        <lord-icon
                          src="https://cdn.lordicon.com/hmpomorl.json"
                          trigger="hover"
                          colors="primary:#ffffff,secondary:#e88c30"
                          style={{ width: "18px", height: "18px", cursor: "pointer" }}
                          onClick={() => { copytext(item.username) }}>
                        </lord-icon>
                      </div>
                    </td>

                    {/* Password + Eye Icon */}
                    <td className="p-2 sm:p-3 wrap-break-words">
                      <div className='flex flex-col sm:flex-row gap-1 sm:gap-2'>
                        <span className="break-all">
                          {visibilityStates[item.id]
                            ? item.password
                            : "•".repeat(item.password ? item.password.length : 0)}
                        </span>
                        <div className='flex gap-1'>
                          <lord-icon
                            src={
                              visibilityStates[item.id]
                                ? "https://cdn.lordicon.com/dicvhxpz.json"
                                : "https://cdn.lordicon.com/fgxwhgfp.json" // 🔒 lock
                            }
                            trigger="click"
                            colors="primary:#ffffff,secondary:#e88c30"
                            style={{ width: "18px", height: "18px", cursor: "pointer" }}
                            onClick={() => togglevisibility(item.id)}
                          ></lord-icon>
                          <lord-icon
                            src="https://cdn.lordicon.com/hmpomorl.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#e88c30"
                            style={{ width: "18px", height: "18px", cursor: "pointer" }}
                            onClick={() => { copytext(item.password) }}>
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3">
                      <div className='flex gap-2 sm:gap-6 items-center'>
                        <span onClick={() => { Editpassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#e88c30"
                            style={{ width: "25px", height: "25px", cursor: "pointer" }}>
                          </lord-icon>
                        </span>
                        <span onClick={() => { openDeleteModal(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#e88c30"
                            style={{ width: "25px", height: "25px", cursor: "pointer" }}>
                          </lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1E293B]/90 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">
              <span className="text-[#D97706]"></span>
              <span className="text-[#FEFAE0]">Confirm Delete</span>
              <span className="text-[#D97706]"></span>
            </h2>
            <p className="text-center mb-6">Are you sure you want to delete this password?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={closeDeleteModal}
                className="px-6 py-2 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-[#D97706] rounded-full hover:bg-[#b45309] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Showpasswords;
