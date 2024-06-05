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
import Store, { loader as storeLoader } from "./pages/Store";
import Uploads, { action as uploadAction } from "./pages/Uploads";
import Edit, { action as editAction } from "./pages/Edit";
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
      <Route path="store" element={<Store />} loader={storeLoader} />
      <Route path="upload" element={<Uploads />} action={uploadAction} />
      <Route path="edit/:identifier" element={<Edit />} action={editAction} />
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
