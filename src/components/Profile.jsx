import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user, updateUserInfo, changePassword } = useAuth();
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleEditClick = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSave = async () => {
    if (editingField) {
      const updateData = { [editingField]: editValue };
      const result = await updateUserInfo(updateData);
      if (result.success) {
        setEditingField(null);
        setEditValue("");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave(e);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newpassword !== passwordData.confirmpassword) {
      alert("New passwords do not match!");
      return;
    }
    const result = await changePassword(passwordData);
    if (result.success) {
      setShowPasswordChange(false);
      setPasswordData({ oldpassword: "", newpassword: "", confirmpassword: "" });
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] overflow-hidden">
      <div className="h-screen w-full flex">
        {/* Left Side - Profile Info (30-40%) */}
        <div className="w-full md:w-2/5 lg:w-1/3 p-8 flex flex-col justify-center">
          <div className="bg-[#1E293B]/60 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            {/* User Avatar and Name */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#D97706] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{getInitials(user?.fullname)}</span>
              </div>
              <h1 className="text-2xl font-bold text-[#FEFAE0]">{user?.fullname}</h1>
              <p className="text-[#D97706]">@{user?.username}</p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center justify-between p-3 bg-[#334155]/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[#D97706] mb-1">Email</h3>
                  {editingField === 'email' ? (
                    <input
                      type="email"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full bg-transparent border border-[#D97706] rounded px-2 py-1 text-[#FEFAE0] focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <p className="text-[#FEFAE0]">{user?.email}</p>
                  )}
                </div>
                <div className="ml-2">
                  {editingField === 'email' ? (
                    <div className="flex gap-2">
                      <lord-icon
                        src="https://cdn.lordicon.com/hqymwwho.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#10b981"
                        style={{ width: "20px", height: "20px", cursor: "pointer" }}
                        onClick={handleSave}
                      ></lord-icon>
                      <lord-icon
                        src="https://cdn.lordicon.com/jzinekkv.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#ef4444"
                        style={{ width: "20px", height: "20px", cursor: "pointer" }}
                        onClick={handleCancel}
                      ></lord-icon>
                    </div>
                  ) : (
                    <lord-icon
                      src="https://cdn.lordicon.com/exymduqj.json"
                      trigger="hover"
                      colors="primary:#ffffff,secondary:#e88c30"
                      style={{ width: "20px", height: "20px", cursor: "pointer" }}
                      onClick={() => handleEditClick('email', user?.email || '')}
                    ></lord-icon>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="flex items-center justify-between p-3 bg-[#334155]/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[#D97706] mb-1">Password</h3>
                  <p className="text-[#FEFAE0]">••••••••</p>
                </div>
                <div className="ml-2">
                  <lord-icon
                    src="https://cdn.lordicon.com/exymduqj.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#e88c30"
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                  ></lord-icon>
                </div>
              </div>

              {/* Password Change Form */}
              {showPasswordChange && (
                <div className="p-3 bg-[#334155]/50 rounded-lg">
                  <form onSubmit={handlePasswordChange} className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={passwordData.oldpassword}
                      onChange={(e) => setPasswordData({...passwordData, oldpassword: e.target.value})}
                      className="w-full bg-transparent border border-[#D97706] rounded px-2 py-1 text-[#FEFAE0] focus:outline-none"
                      required
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwordData.newpassword}
                      onChange={(e) => setPasswordData({...passwordData, newpassword: e.target.value})}
                      className="w-full bg-transparent border border-[#D97706] rounded px-2 py-1 text-[#FEFAE0] focus:outline-none"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={passwordData.confirmpassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmpassword: e.target.value})}
                      className="w-full bg-transparent border border-[#D97706] rounded px-2 py-1 text-[#FEFAE0] focus:outline-none"
                      required
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-[#D97706] text-white py-1 rounded hover:bg-[#b45309]"
                      >
                        Change Password
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPasswordChange(false)}
                        className="flex-1 bg-gray-600 text-white py-1 rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Marketing Content (60%) */}
        <div className="w-full md:w-3/5 lg:w-2/3 p-8 flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            {/* Hero Section */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-[#D97706]"></span>
                <span className="text-[#FEFAE0]">Secure Your </span>
                <span className="text-[#D97706]">Digital Life</span>
                <span className="text-[#D97706]"></span>
              </h2>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1E293B]/60 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <div className="text-3xl mb-4">🔐</div>
                <h3 className="text-xl font-semibold text-[#FEFAE0] mb-2">Secure Storage</h3>
                <p className="text-gray-300">Your passwords are encrypted and stored securely.</p>
              </div>

              <div className="bg-[#1E293B]/60 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-[#FEFAE0] mb-2">Easy Access</h3>
                <p className="text-gray-300">Access your passwords anytime, anywhere.</p>
              </div>

              <div className="bg-[#1E293B]/60 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <div className="text-3xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold text-[#FEFAE0] mb-2">Auto Generate</h3>
                <p className="text-gray-300">Generate strong, unique passwords automatically.</p>
              </div>

              <div className="bg-[#1E293B]/60 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold text-[#FEFAE0] mb-2">Profile Management</h3>
                <p className="text-gray-300">Update your information securely and easily.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
