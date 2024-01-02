import { useContext, useEffect } from "react";
import { userContext, AuthContextType } from "../context/AuthContext";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, setUser } = useContext(userContext) as AuthContextType;
  // const navigate = useNavigate();

  useEffect(() => {
    // const cookieUser = Cookies.get("data");
    // console.log(cookieUser);
    // const extractUsername = (response: string) => {
    //   const match = response.match(/"user"\s*:\s*"([^"]+)"/);
    //   return match ? match[1] : null;
    // };

    // setUser(extractUsername(cookieUser as string) as string);
    // console.log(user)
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
    // navigate("/");
  }, []);

  return (
    <div>
      Welcome, <span className="capitalize">{user}</span>
    </div>
  );
}
