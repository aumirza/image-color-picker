import { Palette } from "../Palette/Palette"
import { PaletteControls } from "../PaletteControls/PaletteControls"
import { PaletteSaver } from "../PaletteSaver/PaletteSaver"

export const PaletteBox = ({ palette, colorCountHandler }) => {
    return (
        <div className=" py-2 px-1 mt-2  rounded ">

            <span className="ml-2">Palette:</span>

            <div className="flex justify-between">
                <PaletteControls {...{ colorCountHandler }} />
                <Palette palette={palette} />
                <PaletteSaver />
            </div>

        </div>
    )
}
