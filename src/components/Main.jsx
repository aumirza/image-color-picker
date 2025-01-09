import { useCallback, useEffect, useState } from "react";
import { generatePalette } from "../Utils/pletteGenerator";
import { MediaUploader } from "./MediaUploader";
import { Canvas } from "./Canvas";
import { PaletteSection } from "./PaletteSection";
import { ColorPicker } from "./ColorPicker";
import { useResponsive } from "../hooks/useResponsive";
import defImage from "../assets/img/default.jpg";

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
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="z-10 flex flex-col items-center justify-center p-5 pb-2 bg-white bg-opacity-25 rounded-md shadow-lg hover:shadow-2xl backdrop-blur-sm">
        <div className="flex justify-center shadow-sm h-[21rem] w-[21rem] md:h-[24rem] md:w-[24rem] rounded-md">
          {loadedImg ? (
            <Canvas
              {...{
                setSelectedColor,
                setTempColor,
                loadedImg,
                setImageData,
                setCatchingHover,
              }}
              width={minWidth("MD") ? 384 : 320}
              height={minWidth("MD") ? 384 : 320}
            />
          ) : (
            ""
          )}
        </div>

        <PaletteSection {...{ colorCountHandler, palette, setSelectedColor }} />
      </div>

      <div className="z-10 flex flex-col items-stretch gap-5 md:flex-row lg:flex-col ">
        <ColorPicker
          tempColor={catchingHover ? tempColor : selectedColor}
          selectedColor={selectedColor}
        />
        <MediaUploader onUpload={newImageHandler} />
      </div>
    </div>
  );
};
