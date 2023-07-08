import Badge from "@/components/Badge/badge";
import {  noteType, tagType } from "@/types";
import React from "react";

const EditorHeader = ({ notesDetails }: { notesDetails: noteType }) => {
  console.log(notesDetails, "notesDetails");
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
          className="rounded-lg bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
