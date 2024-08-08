import React from "react";
import githubIcon from "../assets/img/github.svg";

export const Header = () => {
  return (
    <header className="grid place-items-center text-2xl py-5 text-white">
      <div className="flex justify-between w-11/12">
        <div className="font-bold text-3xl">Image colour picker</div>
        <div className="">
          <a href="https://github.com/aumirza/image-color-picker">
            <img
              className="h-8 w-8 brightness-100 invert"
              src={githubIcon}
              alt=""
            />
          </a>
        </div>
      </div>
    </header>
  );
};
