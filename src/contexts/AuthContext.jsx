import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Fetch full user data from backend
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/user/CurrentUser", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the backend returns user data, but we need to fetch full details
        // For now, we'll decode the token to get user info
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser({
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
          fullname: decoded.Fullname,
        });
      } else {
        // Token might be invalid, clear it
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        const { accesstoken, refreshtoken, User: userData } = data.data;
        localStorage.setItem("accessToken", accesstoken);
        localStorage.setItem("refreshToken", refreshtoken);
        setUser(userData);
        toast.success("Login successful!");
        return { success: true };
      } else {
        toast.error(data.message || "Login failed");
        return { success: false };
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      return { success: false };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/user/Singup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Please login.");
        return { success: true };
      } else {
        toast.error(data.message || "Signup failed");
        return { success: false };
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      return { success: false };
    }
  };

  const logout = async () => {
    // Always clear local state first
    const token = localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);

    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Logged out successfully!");
      } else {
        toast.error("Logout failed on server");
      }
    } catch (error) {
      toast.error("Network error during logout");
    }
  };

  const updateUserInfo = async (updatedData) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:3000/user/UpdateInformation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(prevUser => ({ ...prevUser, ...updatedData }));
        toast.success("Profile updated successfully!");
        return { success: true };
      } else {
        toast.error(data.message || "Update failed");
        return { success: false };
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      return { success: false };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:3000/user/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password changed successfully!");
        return { success: true };
      } else {
        toast.error(data.message || "Password change failed");
        return { success: false };
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      return { success: false };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUserInfo,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
