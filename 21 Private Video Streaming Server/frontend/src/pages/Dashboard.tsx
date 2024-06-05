import { useContext, useEffect } from "react";
import { userContext, AuthContextType } from "../context/AuthContext";
import {  useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(userContext) as AuthContextType;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("api/dashboard", {
          credentials: "include",
        });
        if (!response.ok) navigate("/");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      Welcome, <span className="capitalize">{user}</span>

    </div>
  );
}
