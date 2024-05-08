import { Link, redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

interface Dashboard {
  user: string;
  role: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const response = await fetch("api/dashboard", {
      credentials: "include",
    });

    if (response.status === 403) {
      return redirect("/");
    } else if (response.status === 401) {
      return redirect("/login");
    }

    const response_data = await response.json();
    return response_data;
  } catch (error) {
    return { error: error };
  }
};

export default function Dashboard() {
  const { user, role } = useLoaderData() as Dashboard;
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      {user && role ? (
        <>
          Welcome, <span className="capitalize">{user}</span>
          as {role}
          <div className="bg-teal-500 text-black px-3 py-2 rounded-lg">
            <Link to="/private">Private</Link>
          </div>
        </>
      ) : (
        <div>JWT might have expired</div>
      )}
    </div>
  );
}
