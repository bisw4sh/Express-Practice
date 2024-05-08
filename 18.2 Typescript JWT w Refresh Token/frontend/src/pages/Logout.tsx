import { redirect } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  await fetch("/api/logout", {
    credentials: "include",
  });

  localStorage.clear();
  return redirect("/");
};

export default function Logout() {
  return <div>Logout</div>;
}
