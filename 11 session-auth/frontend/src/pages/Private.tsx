import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const response = await fetch("/api/private", {
    credentials: "include",
  });
  const retval = await response.text();
  console.log(`Returned Value : ${retval}`);
  console.log(retval);
  return retval;
};

const Private = () => {
  const privateData = useLoaderData();
  return (
    <>
      <div>Private</div>
      {privateData ? privateData : " Kei return aayekai xaina"}
    </>
  );
};

export default Private;
