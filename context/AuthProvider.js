import axios from "@/utils/axios";
import { getFromLocalStorage } from "@/utils/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getFromLocalStorage("user");
    if (user) {
      setUser(user);
    }
  }, []);

  const logout = async () => {
    try {
      await axios.post("/api/logout");

      setUser(null);
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const authContextValue = {
    user,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
