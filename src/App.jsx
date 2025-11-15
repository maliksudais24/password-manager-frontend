import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Showpasswords from './components/showpasswords'
import Footer from './components/Footer'
import Introduction from './components/Introduction'
import Profile from './components/Profile'
import ForgetPassword from './components/ForgetPassword'
import './App.css'
import {ToastContainer}from "react-toastify"
import Login from './components/Login'
import Signup from './components/Signup'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    // This keeps your design same but ensures footer sticks to bottom
    <div className="flex flex-col min-h-screen">
        <Navbar />
         <ToastContainer
  position="top-right"
  autoClose={2000}
  hideProgressBar
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="dark"
  toastStyle={{
    backgroundColor: "#1E293B", // dark bluish background
    color: "#D97706",           // orange text color
    borderRadius: "10px",
    fontWeight: "600",
    boxShadow: "0 0 10px rgba(217,119,6,0.4)",
  }}
/>
        {/* This part grows to fill space between navbar and footer */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/home" element={user ? <Manager /> : <Introduction />} />
            <Route path="/Showpasswords" element={user ? <Showpasswords /> : <Introduction />} />
            <Route path="/profile" element={user ? <Profile /> : <Introduction />} />
            <Route path="/about" element={<Introduction />} />
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/forgetpage" element={<ForgetPassword/>}/>
          </Routes>
        </main>

        {/* Footer will always stay at bottom */}
        <Footer />
    </div>

  )
}

export default App
