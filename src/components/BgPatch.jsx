import React from "react";

export const BgPatch = ({ color, opacity, size, postition }) => {
  return (
    <div
      className={
        "hidden md:block fixed z-0 rounded-full " +
        [color, "opacity-" + opacity, "h-" + size, "w-" + size, postition].join(
          " "
        )
      }
    ></div>
  );
};
