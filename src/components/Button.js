import React from "react";

export default function Button(props) {
  const baseStyle =
    "font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1";

  const colorStyle = {
    yellow: "bg-yellow-500 text-white hover:bg-yellow-600",
    blue: "bg-blue-500 text-white hover:bg-blue-600",
    gray: "bg-gray-300 text-gray-700 hover:bg-gray-400",
    red: "bg-red-500 text-white hover:bg-red-600",
    green: "bg-green-500 text-white hover:bg-green-600",
  };

  const color = props.color || "yellow";

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${baseStyle} ${colorStyle[color]} ${
        props.disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${props.className || ""}`}
    >
      {props.label}
    </button>
  );
}
