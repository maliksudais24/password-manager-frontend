import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwordList, setPasswordList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // API base URL
  const API_BASE = "http://localhost:3000";

  // Get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  };

  // Fetch all passwords from backend
  const fetchPasswords = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/password`, {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordList((data.data || []).map(item => ({ ...item, id: item._id })));
      } else {
        toast.error(data.message || "Failed to fetch passwords");
      }
    } catch (error) {
      toast.error("Network error while fetching passwords");
      console.error("Fetch passwords error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new password
  const createPassword = async (passwordData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/password`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (response.ok) {
        // Add the new password to the list
        setPasswordList(prev => [...prev, { ...data.data, id: data.data._id }]);
        toast.success("Password saved successfully!");
        return { success: true };
      } else {
        toast.error(data.message || "Failed to save password");
        return { success: false };
      }
    } catch (error) {
      toast.error("Network error while saving password");
      console.error("Create password error:", error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Update a password
  const updatePassword = async (id, passwordData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/password/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the password in the list
        setPasswordList(prev =>
          prev.map(item =>
            item.id === id ? { ...data.data, id: data.data._id } : item
          )
        );
        toast.success("Password updated successfully!");
        return { success: true };
      } else {
        toast.error(data.message || "Failed to update password");
        return { success: false };
      }
    } catch (error) {
      toast.error("Network error while updating password");
      console.error("Update password error:", error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Delete a password
  const deletePassword = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/password/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the password from the list
        setPasswordList(prev => prev.filter(item => item.id !== id));
        toast.success("Password deleted successfully!");
        return { success: true };
      } else {
        toast.error(data.message || "Failed to delete password");
        return { success: false };
      }
    } catch (error) {
      toast.error("Network error while deleting password");
      console.error("Delete password error:", error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Load passwords when component mounts (if user is logged in)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchPasswords();
    } else {
      // Clear password list if no token
      setPasswordList([]);
    }
  }, []);

  return (
    <PasswordContext.Provider
      value={{
        passwordList,
        setPasswordList,
        editItem,
        setEditItem,
        loading,
        fetchPasswords,
        createPassword,
        updatePassword,
        deletePassword
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};
