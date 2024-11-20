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
        "hover:cursor-pointer group bg-blue-500 flex-grow " +
        (first ? "rounded-l" : last ? "rounded-r" : "")
      }
    >
      <div className="abosulte flex justify-center items-center group-hover:opacity-100 opacity-0 transition-opacity duration-500 ease-in-out top-10 left-0 w-8 h-5 md:w-16 md:h-6 rounded-full bg-white border">
        select
      </div>
    </div>
  );
};

export const PaletteGrid = ({ palette, setSelectedColor }) => {
  return (
    <div className="flex flex-grow mx-2 rounded">
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
