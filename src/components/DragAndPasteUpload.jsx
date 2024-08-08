import React, { useEffect, useCallback, useRef, useState } from "react";

export const DragAndPasteUpload = ({ uploadHandler }) => {
  // const dropRef = useRef();
  const overlayRef = useRef();

  const [dragging, setDragging] = useState(false);

  const pasteHandler = useCallback(
    (e) => {
      const text = e.clipboardData.getData("text");
      const clipboardItems = e.clipboardData.items;

      const image =
        clipboardItems[0].kind === "file"
          ? clipboardItems[0].getAsFile()
          : null;

      if (image) {
        uploadHandler(image);
        return;
      }

      const IMAGE_URL_EXP =
        /^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim;
      if (text && text.match(IMAGE_URL_EXP)) {
        fetch(text)
          .then((res) => res.blob())
          .then((blob) => uploadHandler(blob));
      }
    },
    [uploadHandler]
  );

  useEffect(() => {
    window.addEventListener("paste", pasteHandler);
    return () => {
      window.removeEventListener("paste", pasteHandler);
    };
  }, [pasteHandler]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target !== overlayRef.current) setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === overlayRef.current) setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const { files } = e.dataTransfer;

    setDragging(false);

    if (files?.length) uploadHandler(files[0]);
  };

  useEffect(() => {
    // dropRef.current.addEventListener("dragover", handleDragOver);
    // wait for window
    console.log(window);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);

    // return () => {
    //   window.removeEventListener("dragover", handleDragOver);
    //   window.removeEventListener("drop", handleDrop);
    //   window.removeEventListener("dragenter", handleDragEnter);
    //   window.removeEventListener("dragleave", handleDragLeave);
    // };
  }, []);

  return dragging ? (
    <div ref={overlayRef} className="fixed top-0 left-0 z-10 h-full w-full p-3">
      <div className="flex justify-center items-center h-full bg-black bg-opacity-20 border-2 border-dashed">
        <span className="text-white text-4xl">Drop Here</span>
      </div>
    </div>
  ) : (
    ""
  );
};
