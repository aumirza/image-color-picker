import { useState } from "react";

export const ColorInputBox = ({ label, inputText }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (inputText) {
      navigator.clipboard.writeText(inputText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 500);
    } else {
      console.log("Select a color first");
    }
  };

  return (
    <div className="relative flex h-8 bg-[rgba(255,255,255,.3)] rounded items-center px-2 font-mono my-0.5">
      <label>{label}</label>
      <input
        className="w-24 bg-transparent"
        value={inputText}
        readOnly
        type="text"
      />

      {copied ? (
        <div className="z-30 absolute bg-white p-0.5 right-10 bg-opacity-95 rounded-l my-auto after:content-[''] after:h-7 after:w-3 after:top-0 after:bg-white after:absolute after:left-full after:clip-triangle">
          copied
        </div>
      ) : (
        ""
      )}

      <svg
        className={`h-5 w-5  hover:cursor-pointer text-gray-700 opacity-75 transform ${
          copied ? "scale-110" : ""
        }`}
        onClick={copyToClipboard}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
        />
      </svg>
    </div>
  );
};
