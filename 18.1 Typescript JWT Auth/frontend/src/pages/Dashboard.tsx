import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

interface Dashboard {
  user: string;
  role: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const userFetched = await fetch("api/dashboard", {
      credentials: "include",
    });

    const userReturned = await userFetched.json();

    return userReturned;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export default function Dashboard() {
  const { user, role } = useLoaderData() as Dashboard;
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      Welcome, <span className="capitalize">{user}</span>
      as {role}
      <div className="bg-teal-500 text-black px-3 py-2 rounded-lg">
        <Link to="/private">Private</Link>
      </div>
    </div>
  );
}
