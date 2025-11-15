import React, {  useContext ,useState, useRef , useEffect } from "react";
import {v4 as uuidv4 } from "uuid"
import { PasswordContext } from "../contexts/Passwrodcontext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Manager = () => {
const {passwordList, setPasswordList, editItem, setEditItem, createPassword, updatePassword }= useContext(PasswordContext)
const { user } = useAuth();
const navigate = useNavigate();

// Redirect to introduction if not authenticated
useEffect(() => {
  if (!user) {
    navigate("/");
  }
}, [user, navigate]);


  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({site:"",username: "", password :"" })
  const inputRef = useRef(null);
  const iconRef = useRef(null);


  useEffect(()=>{
    if(editItem){
      setform({
        site: editItem.site,
        username: editItem.username,
        password:editItem.password
      })
    } else {
      setform({site:"",username: "", password :""})
    }
  },[editItem])
  const togglePassword = () => {
    const newState = !showPassword;
    setShowPassword(newState);

    // ✅ Toggle input type
    if (inputRef.current) {
      inputRef.current.type = newState ? "text" : "password";
    }

    // ✅ Toggle icon
    if (iconRef.current) {
      iconRef.current.setAttribute(
        "src",
        newState
          ?  "https://cdn.lordicon.com/dicvhxpz.json"
          : "https://cdn.lordicon.com/fgxwhgfp.json" // 🔒 closed (hide)
      );
    }
  };


  const Savepassword = async () => {
    if(editItem){
      await updatePassword(editItem.id, form);
      setEditItem(null)
    } else {
      await createPassword(form);
    }
    setform({site:"",username: "", password :""})
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      Savepassword();
    }
  }

  const handlechange =(e) => {
    setform({...form,[e.target.name]: e.target.value})
  }

  return (
    <>
      {/* Background */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center text-white font-['Times_New_Roman'] py-4">
       <h1 className="text-4xl font-bold mb-3 ml-26">
            <span className="text-[#D97706]">&lt;</span>
            <span className="text-[#FEFAE0]">Pass</span>
            <span className="text-[#D97706]">Protected</span>
            <span className="text-[#D97706]">/&gt;</span>
          </h1>
        <p className="text-sm text-gray-300 mb-8">
          Your Own Secure Password Manager
        </p>

        <div className="bg-[#1E293B]/60 backdrop-blur-md p-4 sm:p-7 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md">
          <input
          onChange = {handlechange}
          onKeyPress={handleKeyPress}
          value={form.site}
          name="site"
            type="text"
            placeholder="Enter Website / App Name"
            className="w-full mb-4 px-4 py-2 rounded-full outline-none text-white border"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
            onChange = {handlechange}
            onKeyPress={handleKeyPress}
            value={form.username}
            name="username"
              type="text"
              placeholder="Username"
              className="w-full sm:w-1/2 px-4 py-2 rounded-full outline-none text-white border"
            />

            {/* ✅ Password field */}
<div className="relative border w-full rounded-full flex items-center">
  <input
    value={form.password}
    onChange={handlechange}
    onKeyPress={handleKeyPress}
    ref={inputRef}
    name="password"
    type={showPassword ? "text" : "password"}   // ✅ Directly bind to state
    placeholder="Password"
    className="w-[80%] px-4 py-2 outline-none text-white bg-transparent"
  />

  <span
    className="absolute right-4 cursor-pointer"
    onClick={togglePassword}  // ✅ handle click here
  >
    <lord-icon
      ref={iconRef}
      src={
        showPassword
          ?  "https://cdn.lordicon.com/dicvhxpz.json"
          : "https://cdn.lordicon.com/fgxwhgfp.json" // closed eye
      }
      trigger="hover"
      colors="primary:#ffffff,secondary:#e88c30"
      style={{ width: "23px", height: "23px" }}
    ></lord-icon>
  </span>
</div>
          </div>

          <button
            className="mt-8 w-full sm:w-[50%] flex items-center justify-center gap-3 py-2
                       bg-linear-to-r from-[#1E3A8A] to-[#D97706]
                       rounded-full text-white font-semibold
                       hover:opacity-90 hover:scale-[1.02]
                       transition-all duration-300"
            onClick={Savepassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover"
              colors="primary:#121331,secondary:#e88c30"
              style={{ width: "28px", height: "28px" }}
            ></lord-icon>
            Save Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Manager;
