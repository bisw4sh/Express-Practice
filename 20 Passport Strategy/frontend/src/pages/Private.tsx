import { useLoaderData, redirect } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const response = await fetch("/api/private", {
    credentials: "include",
  });

  if (!response.ok) return redirect("/");

  const json = await response.json();
  return json;
};

interface PrivateData {
  message: string;
}

const Private = () => {
  const data = useLoaderData() as PrivateData;

  return <>{data ? data.message : "Nothing to show"}</>;
};

export default Private;
