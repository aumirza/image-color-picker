import { useCallback, useEffect, useState } from "react";
import { generatePalette } from "../Utils/pletteGenerator";
import { MediaUploader } from "./MediaUploader";
import { Canvas } from "./Canvas";
import { PaletteSection } from "./PaletteSection";
import { ColorPicker } from "./ColorPicker";
import defImage from "../assets/img/default.jpg";
import { useResponsive } from "../hooks/useResponsive";

export const Main = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [tempColor, setTempColor] = useState("");
  const [loadedImg, setLoadedImg] = useState(null);
  const [palette, setPalette] = useState([]);
  const [colorCount, setColorCount] = useState(5);
  const [imageData, setImageData] = useState(null);

  const [catchingHover, setCatchingHover] = useState(false);
  const { minWidth } = useResponsive();

  const getPalette = useCallback(() => {
    const palette = generatePalette(imageData, colorCount);
    setPalette(palette);
  }, [imageData, colorCount]);

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
  }, [imageData, getPalette]);

  useEffect(() => {
    const initialImg = new Image();
    initialImg.onload = () => {
      setLoadedImg(initialImg);
    };
    initialImg.src = defImage;
  }, []);

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="flex md:flex-col z-10 shadow-lg hover:shadow-2xl p-2 mr-6 rounded-md  bg-white bg-opacity-25 backdrop-blur-sm">
        <div className="flex justify-center shadow-sm h-[21rem] w-[21rem] md:h-[26rem] md:w-[26rem] rounded-md">
          {loadedImg ? (
            <Canvas
              {...{
                setSelectedColor,
                setTempColor,
                loadedImg,
                setImageData,
                setCatchingHover,
              }}
              width={minWidth("MD") ? 410 : 320}
              height={minWidth("MD") ? 410 : 320}
            />
          ) : (
            ""
          )}
        </div>

        <PaletteSection {...{ colorCountHandler, palette, setSelectedColor }} />
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
