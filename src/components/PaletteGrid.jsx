const PaletteItem = ({ color, first, last, setSelectedColor }) => {
  const [r, g, b] = color;
  const bgColor = "rgb(" + r + "," + g + "," + b + ")";

  const colourSelectHandler = () => {
    setSelectedColor(color);
  };

  return (
    <div
      key={bgColor}
      style={{ background: bgColor }}
      onClick={colourSelectHandler}
      className={
        "relative hover:cursor-pointer group bg-blue-500 flex-grow min-w-[1rem] " +
        (first ? "rounded-l" : last ? "rounded-r" : "")
      }
    >
      <div className="absolute left-0 flex items-center justify-center h-5 p-0 transition-opacity duration-500 ease-in-out bg-white border rounded-full opacity-0 -top-8 abosulte group-hover:opacity-100 md:w-16 md:h-6">
        select
      </div>
    </div>
  );
};

export const PaletteGrid = ({ palette, setSelectedColor }) => {
  return (
    <div className="flex flex-grow w-full mx-2 rounded">
      {palette.map((colour, i) => (
        <PaletteItem
          setSelectedColor={setSelectedColor}
          key={i}
          color={colour}
          first={i === 0}
          last={i === palette.length - 1}
        />
      ))}
    </div>
  );
};
