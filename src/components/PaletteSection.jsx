import { PaletteGrid } from "./PaletteGrid";
import { PaletteControls } from "./PaletteControls";
import { PaletteSaver } from "./PaletteSaver";

export const PaletteSection = ({
  palette,
  colorCountHandler,
  setSelectedColor,
}) => {
  return (
    <div className="flex flex-col self-stretch px-1 py-2 rounded">
      <span className="text-lg">Palette:</span>

      <div className="flex justify-between">
        {/* <div className="flex justify-between origin-top-right rotate-90 sm:rotate-0"> */}
        <PaletteControls {...{ colorCountHandler }} />
        <PaletteGrid palette={palette} setSelectedColor={setSelectedColor} />
        <PaletteSaver palette={palette} />
      </div>
    </div>
  );
};
