import { Outlet, NavLink } from "react-router-dom";
import { userContext, AuthContextType } from "../context/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  const { user, setUser } = useContext(userContext) as AuthContextType;

  const handleLogOut = async () => {
    await fetch("/api/logout");
    setUser("");
  };
  return (
    <div className="px-8 py-4">
      <nav className="w-full flex justify-between">
        <div className="flex gap-4">
          <NavLink
            to="/"
            className="text-teal-400 hover:text-teal-600 hover:scale-105"
          >
            Home
          </NavLink>
          <NavLink
            to="/register"
            className="text-teal-400 hover:text-teal-600 hover:scale-105"
          >
            Register
          </NavLink>
          <NavLink
            to="/dashboard"
            className="text-teal-400 hover:text-teal-600 hover:scale-105"
          >
            Dashboard
          </NavLink>
        </div>
        <div>
          <button className="btn capitalize">{user}</button>
          <button className="btn">
            {!user ? (
              <NavLink to="login">Login</NavLink>
            ) : (
              <span className="btn" onClick={handleLogOut}>
                Logout
              </span>
            )}
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
