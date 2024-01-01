import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormDataType {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const submitForm = async () => {
      const submission = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    };
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-white dark:bg-dark py-6 sm:py-8 lg:py-12">
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
                htmlFor="email"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Email
              </label>
              <input
                type="text" // Added type="email" for email input
                name="email"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                value={formData.email}
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
                type="password" // Added type="password" for password input
                name="password"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit" // Added type="submit" for the submit button
              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
            >
              Log in
            </button>
          </div>

          <div className="flex items-center justify-center bg-gray-100 p-4">
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
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
