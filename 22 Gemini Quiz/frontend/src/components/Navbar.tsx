import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import useDebounce from "../hooks/useDebounce";

export default function Navbar() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const debouncedNavigate = useDebounce(handleNavigation, 5000);

  return (
    <div data-theme={mode} className="space-x-4 p-4">
      <ThemeToggle mode={mode} setMode={setMode} />
      <button onClick={() => debouncedNavigate("/")} className="link link-info">
        Home
      </button>
      <button
        onClick={() => debouncedNavigate("/main/ffmpeg")}
        className="link link-info"
      >
        FFmpeg
      </button>
      <button
        onClick={() => debouncedNavigate("/main/generative-ai")}
        className="link link-info"
      >
        Generative AI
      </button>
      <button
        onClick={() => debouncedNavigate("/main/web-development")}
        className="link link-info"
      >
        Web Development
      </button>
      <button
        onClick={() => debouncedNavigate("/main/global-warming")}
        className="link link-info"
      >
        Global Warming
      </button>
      <Outlet />
    </div>
  );
}
