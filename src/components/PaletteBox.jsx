import { Palette } from "./Palette";
import { PaletteControls } from "./PaletteControls";
import { PaletteSaver } from "./PaletteSaver";

export const PaletteBox = ({ palette, colorCountHandler }) => {
  return (
    <div className="py-2 px-1 rounded">
      <span className="text-lg ">Palette:</span>

      <div className="flex justify-between ">
        <PaletteControls {...{ colorCountHandler }} />
        <Palette palette={palette} />
        <PaletteSaver />
      </div>
    </div>
  );
};
