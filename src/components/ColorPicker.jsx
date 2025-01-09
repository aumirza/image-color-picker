import { ColorInputBox } from "./ColorInputBox";

export const ColorPicker = ({ selectedColor, tempColor }) => {
  const rgbToHex = ([r, g, b]) =>
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  const rgbToRgbString = ([r, g, b]) => "rgb(" + r + "," + g + "," + b + ")";

  const tempColorHex = tempColor ? rgbToHex(tempColor) : "#000";

  const selectedColorHex = selectedColor ? rgbToHex(selectedColor) : "#000";
  const selectedColorRgb = selectedColor
    ? rgbToRgbString(selectedColor)
    : "#000";

  return (
    <div className="rounded-md shadow-md hover:shadow-xl border-[rgba(255,255,255,.20)] bg-[rgba(255,255,255,.25)]">
      <div className="h-10 rounded-t flex items-center px-3 bg-[rgba(255,255,255,.5)]">
        <div className="flex">
          <div className="w-3 h-3 mx-1 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 mx-1 bg-orange-300 rounded-full"></div>
          <div className="w-3 h-3 mx-1 bg-green-500 rounded-full"></div>
        </div>
      </div>

      <div className="flex px-3 py-5">
        <div className="mr-5">
          <div
            style={{ background: selectedColorHex }}
            className="w-16 h-16 rounded-md shadow-md"
          ></div>
          <div
            style={{ background: tempColorHex }}
            className="w-16 h-10 mt-3 rounded-md shadow-md"
          ></div>
        </div>

        <div className="flex flex-col items-center">
          <ColorInputBox label={"HEX:"} inputText={selectedColorHex} />
          <ColorInputBox label={"RGB:"} inputText={selectedColorRgb} />
        </div>
      </div>

      <div className="flex items-center h-10 px-3 bg-[rgba(255,255,255,.5)] rounded-b">
        <span>More</span>
      </div>
    </div>
  );
};
