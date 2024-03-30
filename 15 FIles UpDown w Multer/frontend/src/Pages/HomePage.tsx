import { Form, useActionData, redirect, Link } from "react-router-dom";

export const action = async ({ request }: { request: Request }) => {
  const data = await request.formData();
  console.log(Object.fromEntries(data));

  const res = await fetch(`/api/submission`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
    },
    body: data,
  });

  // const dataObj = Object.fromEntries(data);
  // const res = await fetch(`/api/submission`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(dataObj),
  // });
  const val = await res?.text();
  console.log(val);
  if (!res.ok) throw res;
  return redirect("/view");
};

export default function HomePage(): JSX.Element {
  const actionData = useActionData();
  console.log(actionData);
  return (
    <div className="h-screen bg-sky-400 flex justify-center items-center">
      <Link
        to="/view"
        className="absolute top-5 left-5 bg-teal-400 px-3 py-2 rounded-md hover:bg-teal-600 hover:text-white hover:underline"
      >
        View
      </Link>
      <Form
        encType="multipart/form-data"
        method="POST"
        className="h-1/2 w-1/2 bg-sky-500 flex justify-center items-center rounded-xl"
      >
        <div className="form-group flex flex-col justify-center items-start h-full w-1/2 gap-4 p-10">
          <label htmlFor="pfp_file">
            <input type="file" className="cursor-pointer" name="pfp_file" />
          </label>

          <label htmlFor="fullName">
            <input
              type="text"
              className="p-2"
              placeholder="Enter your full name"
              name="fullName"
            />
          </label>

          <button
            type="submit"
            value="Upload"
            className="bg-teal-400 p-3 rounded-md"
          >
            Upload
          </button>
        </div>
      </Form>
    </div>
  );
}
