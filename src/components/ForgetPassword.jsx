import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter code, 3: Enter new password
  const [formData, setFormData] = useState({
    email: "",
    resetCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendResetCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/user/sendResetCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Reset code sent to your email!");
        setStep(2);
      } else {
        toast.error(data.message || "Failed to send reset code");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }

    setLoading(false);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    // For demo purposes, we'll just proceed to step 3
    // In a real app, you might want to verify the code here
    setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/user/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          resetCode: formData.resetCode,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successfully!");
        navigate("/Login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="flex items-center justify-center max-h-screen">
        <div className="bg-[#1E293B]/60 backdrop-blur-md p-5 rounded-2xl shadow-lg w-full max-w-md text-white mt-4">
          <h1 className="text-4xl font-bold mb-3 ml-26">
            <span className="text-[#D97706]"></span>
            <span className="text-[#FEFAE0]">Reset</span>
            <span className="text-[#D97706]"> Password </span>
            <span className="text-[#D97706]"></span>
          </h1>

          {step === 1 && (
            <form onSubmit={handleSendResetCode} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-full outline-none bg-transparent border text-white focus:border-[#D97706]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-linear-to-r from-[#1E3A8A] to-[#D97706] rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm">Reset Code</label>
                <input
                  type="text"
                  name="resetCode"
                  value={formData.resetCode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-2 rounded-full outline-none bg-transparent border text-white focus:border-[#D97706]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-linear-to-r from-[#1E3A8A] to-[#D97706] rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300"
              >
                Verify Code
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 rounded-full outline-none bg-transparent border text-white focus:border-[#D97706]"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2 rounded-full outline-none bg-transparent border text-white focus:border-[#D97706]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-linear-to-r from-[#1E3A8A] to-[#D97706] rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <p className="text-center text-sm mt-4">
            Remember your password?{" "}
            <Link to="/Login" className="text-[#D97706] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
