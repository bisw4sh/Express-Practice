import { useNavigate, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export const loader = async () => {
  const response = await fetch("/api/logout", {
    credentials: "include",
  });
  const retval = await response.text();
  console.log(retval);
  localStorage.clear();
  return retval;
};

export default function Logout() {
  const navigate = useNavigate();
  const loaderData = useLoaderData();

  useEffect(() => {
    // (async () => {
    //   const response = await fetch("/api/logout", {
    //     credentials: "include",
    //   });
    //   console.log(response.text());
    localStorage.clear();
    // })();
    console.log(loaderData);

    navigate("/");
  }, []);

  return <div>Logout</div>;
}
