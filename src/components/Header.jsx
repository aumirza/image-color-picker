import React from "react";
import githubIcon from "../assets/img/github.svg";
import hueHunterlogo from "../assets/img/huehunter-logo.png";

export const Header = () => {
  return (
    <header className="grid py-5 text-2xl text-white place-items-center">
      <div className="flex items-center justify-between w-11/12">
        <div className="flex items-center">
          <img className="h-16" src={hueHunterlogo} alt="HueHunter" />
          <div className="">
            <div className="text-3xl font-bold">HueHunter</div>
            <div className="hidden text-sm md:block">
              A sleek and intuitive tool to extract and explore colors from any
              image effortlessly.
            </div>
          </div>
        </div>
        <div className="">
          <a href="https://github.com/aumirza/image-color-picker">
            <img
              className="w-10 h-10 brightness-100 invert"
              src={githubIcon}
              alt=""
            />
          </a>
        </div>
      </div>
    </header>
  );
};
