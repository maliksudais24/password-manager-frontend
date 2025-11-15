import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [showpasswordlogin, setshowpasswordlogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const passwordtoggle = () => {
    const newState = !showpasswordlogin;
    setshowpasswordlogin(newState);

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
    setLoading(true);

    const result = await login(formData);

    if (result.success) {
      navigate("/home");
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

      <div className="flex items-center justify-center max-h-screen ">
        <div className="bg-[#1E293B]/60 backdrop-blur-md p-5 rounded-2xl shadow-lg w-full max-w-md text-white mt-4">
          <h1 className="text-4xl font-bold mb-3 ml-26">
            <span className="text-[#D97706]">&lt;</span>
            <span className="text-[#FEFAE0]">Log</span>
            <span className="text-[#D97706]">in </span>
            <span className="text-[#D97706]">/&gt;</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm">Email/username</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email / username "
                className="w-full px-4 py-2 rounded-full outline-none bg-transparent border  text-white focus:border-[#D97706]"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Password</label>
              <div className="rounded-full border">
                <input
                  ref={inputRef}
                  type={showpasswordlogin ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2  outline-none bg-transparent  text-white focus:border-[#D97706]"
                  required
                />
                <span
                  className="absolute right-8 mt-2 cursor-pointer"
                  onClick={passwordtoggle}  // ✅ handle click here
                >
                  <lord-icon
                    ref={iconRef}
                    src={
                      showpasswordlogin
                        ? "https://cdn.lordicon.com/dicvhxpz.json"
                        : "https://cdn.lordicon.com/fgxwhgfp.json" // closed eye
                    }
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#e88c30"
                    style={{ width: "23px", height: "23px" }}
                  ></lord-icon>
                </span>
              </div>
            </div>
            <Link to="/forgetpage" className=" text-[#D97706] hover:underline hover:cursor-pointer">
              forget your password
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full sm:w-[50%] flex items-center justify-center gap-3 py-2
                         bg-linear-to-r from-[#1E3A8A] to-[#D97706]
                         rounded-full text-white font-semibold
                         hover:opacity-90 hover:scale-[1.02]
                         transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/Signup" className="text-[#D97706] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
