import { useNavigate, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
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
    localStorage.clear();
    console.log(loaderData);

    navigate("/");
  }, [loaderData, navigate]);

  return <div>Logout</div>;
}
