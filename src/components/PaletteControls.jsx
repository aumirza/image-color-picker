export const PaletteControls = ({ colorCountHandler }) => {
  return (
    <div className="">
      <div
        onClick={() => colorCountHandler("+")}
        className="flex mb-1 justify-center items-center h-10 w-10 rounded shadow hover:shadow-md hover:cursor-pointer bg-[rgba(255,255,255,.25)]"
      >
        <span className="text-3xl font-semibold">+</span>
      </div>

      <div
        onClick={() => colorCountHandler("-")}
        className="flex justify-center items-center h-10 w-10 rounded shadow hover:shadow-md hover:cursor-pointer bg-[rgba(255,255,255,.25)]"
      >
        <span className="text-3xl font-semibold">-</span>
      </div>
    </div>
  );
};
