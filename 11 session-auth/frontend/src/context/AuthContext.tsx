import { createContext, useState } from "react";

export interface AuthContextType {
  user: string;
  setUser: (user: string) => void;
}

export const userContext = createContext<AuthContextType | null>(null);

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string>("");
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
