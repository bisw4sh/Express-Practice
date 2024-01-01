import { Outlet, NavLink } from "react-router-dom";

export default function Navbar() {
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

        <button className="btn">
          Mode
        </button>
        <button className="btn">
          <NavLink to='login'>Login | Logout</NavLink>
        </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
