import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthContext from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Logout, { loader as logoutLoader } from "./pages/Logout";
import Private, { loader as privateLoader } from "./pages/Private";
import Register from "./pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Homepage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} loader={logoutLoader} />
      <Route path="register" element={<Register />} />
      <Route path="private" element={<Private />} loader={privateLoader} />
    </Route>
  )
);

export default function App() {
  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}
