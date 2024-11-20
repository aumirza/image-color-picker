import { PaletteGrid } from "./PaletteGrid";
import { PaletteControls } from "./PaletteControls";
import { PaletteSaver } from "./PaletteSaver";

export const PaletteSection = ({
  palette,
  colorCountHandler,
  setSelectedColor,
}) => {
  return (
    <div className="flex  flex-col py-2 px-1 rounded">
      <span className="text-lg ">Palette:</span>

      <div className="flex justify-between rotate-90 origin-top-right">
        <PaletteControls {...{ colorCountHandler }} />
        <PaletteGrid palette={palette} setSelectedColor={setSelectedColor} />
        <PaletteSaver palette={palette} />
      </div>
    </div>
  );
};
