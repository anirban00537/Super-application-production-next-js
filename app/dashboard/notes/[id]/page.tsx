"use client";
import { useGetDetails } from "@/hooks/notes.hook";
import EditorSection from "@/sections/Notes/editor.section";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const {  noteDetails } = useGetDetails();
  console.log(noteDetails, "This is data");
  return (
    <div className="p-4 sm:ml-64">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg  mt-2">
        <EditorSection notesDetails={noteDetails} />
      </div>
    </div>
  );
};

export default Page;
