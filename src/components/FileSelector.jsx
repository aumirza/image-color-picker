export const FileSelector = ({ uploadHandler }) => {
  return (
    <div className="h-48 mt-5 flex flex-col rounded shadow-md hover:shadow-xl border-[rgba(255,255,255,.20)] bg-[rgba(255,255,255,.25)]">
      <div className="flex flex-grow justify-center items-center">
        <div className="rounded border border-dashed  border-[rgba(255,255,255,.3)]  bg-[rgba(255,255,255,.3)]  h-[8rem] w-56">
          <label
            className="h-full flex flex-col justify-center items-center hover:cursor-pointer "
            htmlFor="image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">Browse or drop</span>
            <input
              onChange={(e) => uploadHandler(e.target.files[0])}
              id="image"
              className="opacity-0 h-0"
              type="file"
              alt=""
            />
          </label>
        </div>
      </div>

      <div className="flex items-center  justify-center h-10 bg-slate-100 bg-opacity-50">
        <span className="text-sm">Paste image or URL</span>

        <span className="font-mono text-xs mx-1">
          <span className="border p-0.5 bg-white rounded-sm">ctrl</span>
          <span> + </span>
          <span className="border p-0.5 bg-white rounded-sm">v</span>
        </span>
      </div>
    </div>
  );
};
