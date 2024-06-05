import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { userContext, AuthContextType } from "../context/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  const { user, setUser } = useContext(userContext) as AuthContextType;
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setUser("");
    localStorage.removeItem("user");
    navigate("/logout");
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
          {!user && (
            <NavLink
              to="/register"
              className="text-teal-400 hover:text-teal-600 hover:scale-105"
            >
              Register
            </NavLink>
          )}
          {user && (
            <>
              <NavLink
                to="/dashboard"
                className="text-teal-400 hover:text-teal-600 hover:scale-105"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/upload"
                className="text-teal-400 hover:text-teal-600 hover:scale-105"
              >
                Upload
              </NavLink>
              <NavLink
                to="/private"
                className="text-teal-400 hover:text-teal-600 hover:scale-105"
              >
                Private
              </NavLink>
              <NavLink
                to="/store"
                className="text-teal-400 hover:text-teal-600 hover:scale-105"
              >
                Store
              </NavLink>
            </>
          )}
        </div>
        <div className="flex justify-between items-center gap-3">
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
