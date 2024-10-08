import React, {
  useRef,
  useLayoutEffect,
  useState,
  createRef,
  useEffect,
} from "react";

export const Canvas = ({
  loadedImg,
  height,
  width,
  setSelectedColor,
  setTempColor,
  setImageData,
  setCatchingHover,
}) => {
  const canvasRef = useRef();
  const boxRef = useRef();
  const touchCatcher = createRef();

  const [pos, setPos] = useState([width / 2 - 20, height / 2 - 20]);

  const [ctx, setCtx] = useState(null);

  const getColor = (x, y) => {
    const imgData = ctx.getImageData(x, y, 1, 1);
    return imgData.data.slice(0, 3);
  };

  const onMouseDown = (e) => {
    setPos([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
    setSelectedColor(getColor(e.nativeEvent.offsetX, e.nativeEvent.offsetY));
  };

  const onMouseMove = (e) => {
    let color = getColor(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setTempColor(color);
    setPos([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
  };

  const onMouseEnter = () => {
    setCatchingHover(true);
  };

  const onMouseLeave = () => {
    setCatchingHover(false);
  };

  const calcTouchCoordinates = (e) => {
    let bcr = e.target.getBoundingClientRect();
    let x = e.targetTouches[0].clientX - bcr.x;
    let y = e.targetTouches[0].clientY - bcr.y;
    x = x < 0 ? 0 : x;
    y = y < 0 ? 0 : y;
    x = x > bcr.width - 1 ? bcr.width - 1 : x;
    y = y > bcr.height - 1 ? bcr.height - 1 : y;

    return [x, y];
  };

  const onTouchMove = (e) => {
    e.preventDefault();
    const [x, y] = calcTouchCoordinates(e);
    let color = getColor(x, y);
    setSelectedColor(color);
    setPos([x, y]);
  };

  const calcImgSize = (x, y) => {
    let imgRatio = x / y;
    let setRatio = height / width;
    let finalWidth, finalHeight;
    if (imgRatio > setRatio) {
      finalWidth = width;
      finalHeight = Math.round(width / imgRatio);
    } else {
      finalWidth = Math.round(height * imgRatio);
      finalHeight = height;
    }
    return [finalWidth, finalHeight];
  };

  const setCanvas = (img, ctx) => {
    const [imgWidth, imgHeight] = calcImgSize(img.width, img.height);

    canvasRef.current.width = imgWidth;
    canvasRef.current.height = imgHeight;

    // Todo: this code is not working
    // boxRef.current.style.height = imgHeight;
    // boxRef.current.style.width = imgWidth;
    // Todo: this code is not working

    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

    const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
    setImageData(imageData);
  };

  useEffect(() => {
    touchCatcher.current.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
  }, [touchCatcher]);

  useLayoutEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    setCanvas(loadedImg, ctx);
    setCtx(ctx);
  }, [loadedImg]);

  return (
    <div ref={boxRef} className="relative hover:cursor-crosshair">
      <canvas className="rounded-lg" ref={canvasRef} />
      <div
        ref={touchCatcher}
        {...{ onMouseDown, onMouseMove, onMouseEnter, onMouseLeave }}
        className="absolute h-full w-full top-0 right-0"
      />
    </div>
  );
};
