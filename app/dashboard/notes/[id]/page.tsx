"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useRef, useState } from "react";
import { Label } from "flowbite-react";
import LabelMedium from "@/components/Label/LabelMedium.comp";
import debounce from "lodash/debounce"; // Import debounce function
import { useGetDetails } from "@/hooks/notes.hook";
import { useRouter } from "next/router";

const Page = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const tagsRef = useRef<HTMLInputElement>(null);
  const [tagsList, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const { data } = useGetDetails(Number(id));
  console.log(data, "my data");
  const handleAddTag = () => {
    const tag = tagsRef.current?.value?.toString();
    if (tag) {
      setTags([...tagsList, tag]);
      tagsRef.current!.value = "";
    }
  };

  const debouncedUpdateContent = useRef(
    debounce((newContent) => {
      setContent(newContent);
    }, 500)
  ).current;

  const handleContentChange = (newContent: string) => {
    debouncedUpdateContent(newContent);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg  mt-16">
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 font-bold">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="tags" value="Tags" />
          </div>
          <div className="flex justify-between">
            <input
              id="tags"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              ref={tagsRef}
              placeholder="Enter a tag"
              // required
            />
            <button
              className="bg-gradient-to-br from-purple-500 to-orange-400 p-2 text-white ml-2 rounded-md text-base"
              type="button"
              onClick={handleAddTag}
            >
              Add
            </button>
          </div>
          <div className="mt-5">
            {tagsList.map((tag) => (
              <LabelMedium title={tag} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block mb-2 font-bold">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange} // Use the debounced handler for content change
            style={{ height: "400px" }} // Increase the height of the editor
          />
        </div>

        <div className="flex justify-end mt-14">
          <button className="bg-gradient-to-br from-purple-500 to-orange-400 p-2 text-white ml-2 rounded-md text-base">
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
