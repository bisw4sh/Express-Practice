import { useLoaderData, redirect } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const response = await fetch("/api/private", {
    credentials: "include",
  });
  const retval = await response.text();
  console.log(retval);

  if (retval === "redirect") return redirect("/login");

  return retval;
};

const Private = () => {
  const privateData = useLoaderData();
  return (
    <>
      <div>Private Information</div>
      {privateData ? privateData : "Nothing to show"}
    </>
  );
};

export default Private;
