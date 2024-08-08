import { useEffect, useState } from "react";
import { generatePalette } from "../Utils/pletteGenerator";
import defImage from "../assets/img/default.jpg";
import { MediaUploader } from "./MediaUploader";
import { Canvas } from "./Canvas";
import { PaletteBox } from "./PaletteBox";
import { ColorPicker } from "./ColorPicker";

export const Main = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [tempColor, setTempColor] = useState("");
  const [loadedImg, setLoadedImg] = useState(null);
  const [palette, setPalette] = useState([]);
  const [colorCount, setColorCount] = useState(5);
  const [imageData, setImageData] = useState(null);

  const [catchingHover, setCatchingHover] = useState(false);

  const getPalette = () => {
    const palette = generatePalette(imageData, colorCount);
    setPalette(palette);
  };

  const colorCountHandler = (operation) => {
    switch (operation) {
      case "+":
        setColorCount((colorCount) =>
          colorCount < 10 ? colorCount + 1 : colorCount
        );
        break;
      case "-":
        setColorCount((colorCount) =>
          colorCount > 2 ? colorCount - 1 : colorCount
        );
        break;
      default:
        break;
    }
  };

  const newImageHandler = (image) => {
    const initialImg = new Image();
    initialImg.onload = () => {
      setLoadedImg(initialImg);
    };
    initialImg.src = URL.createObjectURL(image);
  };

  useEffect(() => {
    if (imageData) getPalette();
  }, [imageData, colorCount]);

  useEffect(() => {
    const initialImg = new Image();
    initialImg.onload = () => {
      setLoadedImg(initialImg);
    };
    initialImg.src = defImage;
  }, []);

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="z-10 shadow-lg hover:shadow-2xl p-2 mr-6  rounded-md  bg-white bg-opacity-25 backdrop-blur-sm">
        <div className="flex justify-center shadow-sm h-[26rem] w-[26rem] rounded-md">
          {loadedImg ? (
            <Canvas
              {...{
                setSelectedColor,
                setTempColor,
                loadedImg,
                setImageData,
                setCatchingHover,
              }}
              width={410}
              height={410}
            />
          ) : (
            ""
          )}
        </div>

        <PaletteBox {...{ colorCountHandler, palette }} />
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col p-2 z-10 ">
        <ColorPicker
          tempColor={catchingHover ? tempColor : selectedColor}
          selectedColor={selectedColor}
        />
        <MediaUploader onUpload={newImageHandler} />
      </div>
    </div>
  );
};
