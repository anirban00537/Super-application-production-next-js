"use client";
import { labelMediumType } from "@/types";
import React from "react";

const LabelMedium = ({ title, handleRemove }: labelMediumType) => {
  return (
    <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-pink-900 dark:text-pink-300">
      {title}
      <button
        type="button"
        className="ml-2 text-pink-800 dark:text-pink-300 hover:text-pink-600 dark:hover:text-pink-400"
        onClick={() => {
          handleRemove();
        }}
      >
        &#10005;
      </button>
    </span>
  );
};

export default LabelMedium;
