import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormDataType {
  user: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [failReg, setFailReg] = useState<string>("");
  const [formData, setFormData] = useState<FormDataType>({
    user: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitForm = async () => {
    try {
      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (!response.ok) {
        setFailReg(json?.message);
        throw new Error(json?.message ?? "Failed to Register");
      }

      return navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setFailReg(error.message);
      } else {
        console.log("Unexpected error", error);
        setFailReg("An unexpected error occurred");
      }
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
          Register
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

            <div className="text-rose-500 self-center">{failReg}</div>

            <button
              type="submit"
              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
            >
              Register
            </button>
          </div>

          <div className="flex items-center justify-center p-4">
            <p className="text-center text-sm text-gray-500">
              Already have an account? {""}
              <Link
                to="/login"
                className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
