import { createContext, useState } from "react";

export interface AuthContextType {
  user: string;
  setUser: (user: string) => void;
}
  
// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext<AuthContextType | null>(null);

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const fromLocal: string | null = localStorage.getItem("user");
  const [user, setUser] = useState<string>(
    typeof fromLocal === "string" ? fromLocal : ""
  );
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
