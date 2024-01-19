import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />} errorElement={<Error />}>
        <Route index element={<HomePage />} />
        <Route path="main" element={<MainPage />} />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Error />} />;
}
