import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { userContext, AuthContextType } from "../context/AuthContext";

interface FormDataType {
  user: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(userContext) as AuthContextType;
  const [formData, setFormData] = useState<FormDataType>({
    user: "",
    password: "",
  });
  const [failmsg, setFailmsg] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitForm = async () => {
    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      if (!response.ok) {
        setFailmsg(json?.message);
        throw new Error("Failed to login");
      }

      if (json.success && json.user) {
        localStorage.setItem("user", json.user);
        setUser(json.user);
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
    setFormData({
      user: "",
      password: "",
    });
  };

  return (
    <div className="bg-zinc-300 dark:bg-dark py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
          Login
        </h2>

        <form
          className="mx-auto max-w-lg rounded-lg border"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label
                htmlFor="user"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                user
              </label>
              <input
                type="text"
                name="user"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                value={formData.user}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="text-rose-500 self-center">{failmsg}</div>

            <button
              type="submit"
              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
            >
              Log in
            </button>
          </div>

          <div className="flex items-center justify-center p-4">
            <p className="text-center text-sm text-gray-500">
              Don't have an account? {""}
              <Link
                to="/register"
                className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
