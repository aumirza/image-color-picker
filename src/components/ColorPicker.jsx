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
    <div className="rounded-md w-72 shadow-md hover:shadow-xl border-[rgba(255,255,255,.20)] bg-[rgba(255,255,255,.25)]">
      <div className="h-10 rounded-t flex items-center px-3 bg-[rgba(255,255,255,.5)]">
        <div className="flex">
          <div className="h-3 w-3 mx-1 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 mx-1 rounded-full bg-orange-300"></div>
          <div className="h-3 w-3 mx-1 rounded-full bg-green-500"></div>
        </div>
      </div>

      <div className="flex py-5 px-3">
        <div className="mr-5">
          <div
            style={{ background: selectedColorHex }}
            className="h-16 w-16 rounded-md shadow-md"
          ></div>
          <div
            style={{ background: tempColorHex }}
            className="h-10 w-16 rounded-md mt-3 shadow-md"
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
