"use client";
import { useGetNotes } from "@/hooks/notes.hook";
import NotesTable from "@/sections/Notes/notesTable.section";
import React from "react";

const Notes = () => {
  const { data, handlePaginationChange, refetch } = useGetNotes();
  return (
    <div className="p-4 sm:ml-64">
      {data?.data && (
        <NotesTable
          tableData={data?.data}
          handlePaginationChange={handlePaginationChange}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Notes;
