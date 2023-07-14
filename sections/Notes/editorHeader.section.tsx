import Badge from "@/components/Badge/badge";
import {  noteType, tagType } from "@/types";
import React from "react";

const EditorHeader = ({ notesDetails }: { notesDetails: noteType }) => {
  return (
    <div className="mb-6">
      <div className="mb-5 flex items-center justify-center">
        <input
          type="text"
          id="default-input"
          className="m-0  block w-full rounded-lg border-0 p-0 text-xl mr-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={`${notesDetails?.title}`}
        />
        <button
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Share{" "}
        </button>
      </div>

      <div>
        {notesDetails?.note_tags?.map((tag: tagType) => (
          <Badge title={tag.title} />
        ))}
      </div>
    </div>
  );
};

export default EditorHeader;
