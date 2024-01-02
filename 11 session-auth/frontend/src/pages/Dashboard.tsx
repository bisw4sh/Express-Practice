import { useContext, useEffect } from "react";
import { userContext, AuthContextType } from "../context/AuthContext";
import Cookies from "js-cookie";

export default function Dashboard() {
  const { user, setUser } = useContext(userContext) as AuthContextType;

  useEffect(() => {
    const cookieUser = Cookies.get("data");
    console.log(cookieUser);
    const extractUsername = (response: string) => {
      const match = response.match(/"user"\s*:\s*"([^"]+)"/);
      return match ? match[1] : null;
    };

    setUser(extractUsername(cookieUser as string) as string);
    // console.log(user)
  }, []);
  
  return (
    <div>
      Welcome, <span className="capitalize">{user}</span>
    </div>
  );
}
