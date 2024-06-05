import { Form, useActionData } from "react-router-dom";
import { useParams } from "react-router-dom";

interface ActionData {
  message?: string;
  success?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({
  request,
}: {
  request: Request;
}): Promise<ActionData> => {
  const formData = await request.formData();
  const response = await fetch("/api/edit", {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const res_data: ActionData = await response.json();
  return res_data;
};

const Edit = () => {
  const actionData = useActionData() as ActionData;
  const { identifier } = useParams();

  return (
    <div className="dark:bg-dark">
      <Form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-4 justify-center items-start"
      >
        <input type="hidden" name="identifier" value={identifier} />

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick a thumbnail to change</span>
          </div>
          <input
            type="file"
            name="thumbnail"
            className="file-input file-input-bordered w-full max-w-xs"
            accept="image/png"
          />
        </label>

        <input
          type="text"
          name="title"
          placeholder="To change the title"
          className="input input-bordered w-full max-w-xs"
        />
        {actionData?.message && (
          <div className="error-message">
            <p>{actionData.message}</p>
          </div>
        )}
        <button type="submit" className="btn btn-accent">
          Upload
        </button>
      </Form>
    </div>
  );
};

export default Edit;
