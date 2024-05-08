import { useLoaderData, redirect } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const response = await fetch("/api/private", {
    credentials: "include",
  });

  if (response.status === 403) {
    return redirect("/");
  } else if (response.status === 401) {
    return redirect("/login");
  }

  const private_data = await response.text();
  return private_data;
};

const Private = () => {
  const privateData = useLoaderData();
  return (
    <>
      <div>Private Information</div>
      {privateData ?? "No data available"}
    </>
  );
};

export default Private;
