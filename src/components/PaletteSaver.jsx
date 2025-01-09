export const PaletteSaver = ({ palette }) => {
  const saveHandler = () => {
    const savedPalettes =
      JSON.parse(localStorage.getItem("savedPalettes")) || [];
    savedPalettes.push(palette);
    localStorage.setItem("savedPalettes", JSON.stringify(savedPalettes));
  };

  return (
    <div className="">
      <div className="flex mb-1 justify-center items-center h-8 w-8 md:h-10 md:w-10 rounded shadow hover:shadow-md hover:cursor-pointer bg-[rgba(255,255,255,.25)]">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          shapeRendering="geometricPrecision"
          viewBox="0 0 24 24"
          height="20"
          width="20"
        >
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"></path>
        </svg>
      </div>

      <div
        className="flex justify-center items-center h-8 w-8 md:h-10 md:w-10 rounded shadow hover:shadow-md hover:cursor-pointer bg-[rgba(255,255,255,.25)]"
        onClick={saveHandler}
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          shapeRendering="geometricPrecision"
          viewBox="0 0 24 24"
          height="20"
          width="20"
        >
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
          <path d="M17 21v-8H7v8M7 3v5h8"></path>
        </svg>
      </div>
    </div>
  );
};
