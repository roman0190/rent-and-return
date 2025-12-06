"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  email: string;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    setIsLoading(false);
  }, []);

  // isAdmin derive
  const isAdmin = email.includes("admin");

  // Login function
  const login = async (email: string, password: string) => {
    // Success: email save
    setEmail(email);
    localStorage.setItem("email", email);
  };
  // Logout function
  const logout = () => {
    setEmail("");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ email, isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
