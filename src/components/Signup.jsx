import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const [showpasswordsignup, setshowpasswordsignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const passwordtoggle = () => {
    const newState = !showpasswordsignup;
    setshowpasswordsignup(newState);

    // ✅ Toggle input type
    if (inputRef.current) {
      inputRef.current.type = newState ? "text" : "password";
    }

    // ✅ Toggle icon
    if (iconRef.current) {
      iconRef.current.setAttribute(
        "src",
        newState
          ? "https://cdn.lordicon.com/dicvhxpz.json"
          : "https://cdn.lordicon.com/fgxwhgfp.json" // 🔒 closed (hide)
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    const { confirmPassword, ...signupData } = formData;
    const result = await signup(signupData);

    if (result.success) {
      navigate("/login");
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="flex items-center justify-center max-h-[10%] mt-2 ">
        <div className="bg-[#1E293B]/60 backdrop-blur-md p-5 rounded-2xl shadow-lg w-full max-w-md text-white">
         <h1 className="text-4xl font-bold mb-3 ml-26">
            <span className="text-[#D97706]">&lt;</span>
            <span className="text-[#FEFAE0]">Sign</span>
            <span className="text-[#D97706]">up </span>
            <span className="text-[#D97706]">/&gt;</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your Email"
                className="w-full px-3 py-2 rounded-full outline-none bg-transparent border  text-white focus:border-[#D97706]"
                required
              />
            </div>
            <div className=" flex space-x-4 mt-7">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your username"
                className="w-[50%] px-3 py-2 rounded-full outline-none bg-transparent border  text-white focus:border-[#D97706]"
                required
              />
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your full name"
                className="w-[50%] px-3 py-2 rounded-full outline-none bg-transparent border  text-white focus:border-[#D97706]"
                required
              />
            </div>

            <div className="flex space-x-4 mt-7">
              <div className="flex-1">
                <input
                  type={showpasswordsignup ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Create a password"
                  className="w-full px-3 py-2 rounded-full outline-none bg-transparent border text-white focus:border-[#D97706]"
                  required
                />
                <span
                  className="absolute left-47 mt-2 cursor-pointer"
                  onClick={passwordtoggle}  // ✅ handle click here
                >
                  <lord-icon
                    ref={iconRef}
                    src={
                      showpasswordsignup
                        ? "https://cdn.lordicon.com/dicvhxpz.json"
                        : "https://cdn.lordicon.com/fgxwhgfp.json" // closed eye
                    }
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#e88c30"
                    style={{ width: "23px", height: "23px" }}
                  ></lord-icon>
                </span>
              </div>

              <div className="flex-1 " >
                <input
                  type={showpasswordsignup ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Confirm password"
                  className="w-full px-3 py-2 rounded-full outline-none bg-transparent border text-white focus:border-[#D97706]"
                  required
                />
                <span
                  className="absolute right-7 mt-2.5 cursor-pointer"
                  onClick={passwordtoggle}  // ✅ handle click here
                >
                  <lord-icon
                    ref={iconRef}
                    src={
                      showpasswordsignup
                        ? "https://cdn.lordicon.com/dicvhxpz.json"
                        : "https://cdn.lordicon.com/fgxwhgfp.json" // closed eye
                    }
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#e88c30"
                    style={{ width: "21px", height: "21px" }}
                  ></lord-icon>
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full sm:w-[50%] flex items-center justify-center gap-3 py-2
                         bg-linear-to-r from-[#1E3A8A] to-[#D97706]
                         rounded-full text-white font-semibold
                         hover:opacity-90 hover:scale-[1.02]
                         transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#D97706] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
