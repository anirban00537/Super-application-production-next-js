"use client";
import { useGetNotes } from "@/hooks/notes.hook";
import NotesTable from "@/sections/Notes/notesTable.section";
import React from "react";

const Notes = () => {
  const { data } = useGetNotes();
  return (
    <div className="p-4 sm:ml-64">
      <NotesTable />
    </div>
  );
};

export default Notes;
