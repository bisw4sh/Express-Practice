import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import {
  useLoaderData,
  redirect,
  useRevalidator,
  useNavigate,
} from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const response = await fetch("/api/private/self", { credentials: "include" });
  if (response.status === 401 || response.status === 403) return redirect("/");
  const videos: Video[] = await response.json();

  const sanitized_data = videos.map(
    ({ name, identifier, thumbnail }: Video) => ({
      name,
      identifier,
      thumbnail,
    })
  );

  return sanitized_data;
};

interface Video {
  name: string;
  identifier: string;
  thumbnail?: string;
}

const Private = () => {
  const videos = useLoaderData() as Video[];
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  const vidRef = useRef<ReactPlayer>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleDeletion = async (identifier: string) => {
    try {
      await fetch(`/api/deletion/${identifier}`, {
        method: "DELETE",
        credentials: "include",
      });
      revalidator.revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (identifier: string) => {
    navigate(`/edit/${identifier}`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-start pt-8 gap-4">
      <section className="flex justify-center items-center flex-wrap gap-3">
        {videos.map(({ name, identifier, thumbnail }: Video) => {
          return (
            <div
              key={identifier}
              onClick={() => setVideoUrl(`api/private/${identifier}`)}
            >
              <img
                src={
                  thumbnail
                    ? `http://localhost:${
                        import.meta.env.VITE_BACKEND_PORT
                      }/${thumbnail}`
                    : "/thumbnail.webp"
                }
                alt="thumbnail"
                className="rounded-lg w-24"
              />
              <section className="flex justify-between items-center gap-3">
                <div>
                  {name.substring(0, name.lastIndexOf(".")).substring(0, 15)}
                </div>
                <MdDelete
                  className="text-teal-500 hover:text-rose-500 active:text-zinc-100"
                  onClick={() => handleDeletion(identifier)}
                />
                <FaEdit
                  className="text-teal-500 hover:text-rose-500 active:text-zinc-100"
                  onClick={() => handleEdit(identifier)}
                />
              </section>
            </div>
          );
        })}
      </section>

      <main className="wrapper max-h-[90px] md:w-5/6 max-md:w-full ">
        <ReactPlayer
          width="100%"
          light="/thumbnail.webp"
          ref={vidRef}
          url={videoUrl}
          controls
          volume={1}
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />
      </main>
    </div>
  );
};

export default Private;
