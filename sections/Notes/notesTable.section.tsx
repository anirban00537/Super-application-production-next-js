"use client";

import DataTable from "@/components/Table/dataTable.comp";
import React, { useMemo } from "react";
import { FaInfoCircle } from "react-icons/fa";

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
          <button
            className="flex items-center text-gray-900 focus:outline-none hover:text-indigo-500"
            // Add any additional styles or class names as needed
          >
            <span className="mr-1">Details</span>
            <FaInfoCircle className="ml-2" />
          </button>
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
          <button
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Create A New Note
          </button>
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
