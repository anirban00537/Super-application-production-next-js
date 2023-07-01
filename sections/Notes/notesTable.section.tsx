"use client";

import DataTable from "@/components/Table/dataTable.comp";
import React, { useMemo } from "react";
import CreateNoteModal from "./createNoteModal.section";
import { FaInfoCircle, FaEdit } from "react-icons/fa";

const NotesTable = ({ tableData, handlePaginationChange }: any) => {
  const { notes } = tableData;
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "content",
      },
      {
        Header: "Created at",
        accessor: "createdAt",
      },
      {
        Header: "Action",
        Cell: () => (
          <div className="flex">
            <button
              type="button"
              className="px-3 py-2 text-xs font-medium text-center text-white bg-gradient-to-br from-red-500 to-orange-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-orange-400 dark:focus:ring-blue-800 flex"
            >
              <FaInfoCircle className="mr-1" />
              Details
            </button>
            <button
              type="button"
              className="px-3 py-2 text-xs font-medium text-center text-white bg-gradient-to-br from-red-500 to-orange-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-orange-400 dark:focus:ring-blue-800 ml-2 flex"
            >
              <FaEdit className="mr-1" />
              Edit
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full flex items-center justify-between">
          <div>
            <input
              placeholder="Search notes"
              type="text"
              className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              // value={globalFilter || ""}
              // onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          {/* <button
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Create A New Note
          </button> */}
          <CreateNoteModal />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={notes}
        dataWithPagination={tableData}
        handlePaginationChange={handlePaginationChange}
        search={false}
      />
    </div>
  );
};

export default NotesTable;
