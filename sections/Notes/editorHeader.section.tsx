import Badge from "@/components/Badge/badge";
import { noteType, tagType } from "@/types";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const EditorHeader = ({
  notesDetails,
  updateNoteTitle,
}: {
  notesDetails: noteType;
  updateNoteTitle: any;
}) => {
  const [title, setTitle] = useState<string>();
  const [note_tags, setNoteTags] = useState<tagType[]>();
  const [value] = useDebounce(title, 1500);
  useEffect(() => {
    if (notesDetails?.id && value) {
      updateNoteTitle(notesDetails?.id, value);
    }
  }, [value]);
  useEffect(() => {
    setNoteTags(notesDetails?.note_tags);
  }, [notesDetails]);
  return (
    <div className="mb-6">
      <div className="mb-5 flex items-center justify-center">
        <input
          type="text"
          id="default-input"
          className="m-0  block w-full rounded-lg border-0 p-0 text-xl mr-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={title ? title : notesDetails?.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Share
        </button>
      </div>

      <div>
        {note_tags?.map((tag: tagType) => (
          <Badge title={tag.title} />
        ))}
      </div>
    </div>
  );
};

export default EditorHeader;
