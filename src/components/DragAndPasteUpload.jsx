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

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target !== overlayRef.current) setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === overlayRef.current) setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        uploadHandler(e.dataTransfer.files[0]);
      }
    },
    [uploadHandler]
  );

  useEffect(() => {
    // dropRef.current.addEventListener("dragover", handleDragOver);
    // wait for window
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
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  return dragging ? (
    <div ref={overlayRef} className="fixed top-0 left-0 z-10 w-full h-full p-3">
      <div className="flex items-center justify-center h-full bg-black border-2 border-dashed bg-opacity-20">
        <span className="text-4xl text-white">Drop Here</span>
      </div>
    </div>
  ) : (
    ""
  );
};
