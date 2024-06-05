import { Form, redirect, useActionData } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: { request: Request }) => {
  try {
    const formData = await request.formData();
    const videoFile = formData.get("video");

    if (!videoFile) {
      throw new Error("No video file uploaded");
    }

    const response = await fetch("api/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return redirect("/");
  } catch (error) {
    return { error: (error as Error).message || "Unknown error occurred" };
  }
};

const Uploads = () => {
  const actionData = useActionData() as { error: string };

  return (
    <div className="dark:bg-dark">
      <Form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-4 justify-center items-start"
      >
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick a video</span>
          </div>
          <input
            type="file"
            name="video"
            className="file-input file-input-bordered w-full max-w-xs"
            accept="video/*"
          />
        </label>
        {actionData?.error && (
          <div className="error-message">
            <p>{actionData?.error}</p>
          </div>
        )}
        <button type="submit" className="btn btn-accent">
          Upload
        </button>
      </Form>
    </div>
  );
};

export default Uploads;
