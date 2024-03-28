import { useContext, useEffect } from "react";
import { userContext, AuthContextType } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, setUser } = useContext(userContext) as AuthContextType;

  useEffect(() => {
    (async () => {
      try {
        const userFetched = await fetch("api/find", {
          credentials: "include",
        });

        const userReturned = await userFetched.text();
        setUser(userReturned);
        localStorage.setItem("user", userReturned);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    })();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      Welcome, <span className="capitalize">{user}</span>
      <div className="bg-teal-500 text-black px-3 py-2 rounded-lg">
        <Link to="/private">Private</Link>
      </div>
    </div>
  );
}
