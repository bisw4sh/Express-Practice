import { CONSTANTS } from "../utility/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const View = () => {
  const [imgQuery, setImgQuery] = useState<string | null>("");
  return (
    <div className="h-screen bg-sky-400 flex justify-center items-center">
      <Link
        to="/"
        className="absolute top-5 left-5 bg-teal-400 px-3 py-2 rounded-md hover:bg-teal-600 hover:text-white hover:underline"
      >
        Home
      </Link>
      <div>
        <label htmlFor="img-search">
          Image that you like to view :
          <input
            type="text"
            placeholder="Enter the name of the image to display with its extension"
            name="img-search"
            className="my-4 p-2 rounded-md w-full border-none"
            onChange={(e) => setImgQuery(e.target.value)}
          />
        </label>

        <div>
          <img
            src={`${CONSTANTS.ENDPOINT}${imgQuery}`}
            alt="file will be displayed here"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default View;
