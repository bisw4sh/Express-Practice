import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/logout", {
        credentials: "include",
      });
      console.log(response.text());
      localStorage.clear();
    })();
    navigate("/");
  }, []);

  return <div>Logout</div>;
}
