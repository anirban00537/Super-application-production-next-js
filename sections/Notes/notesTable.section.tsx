"use client";

import DataTable from "@/components/Table/dataTable.comp";
import React, { useMemo } from "react";
import CreateNoteModal from "./createNoteModal.section";
import { FaInfoCircle, FaEdit } from "react-icons/fa";
import Link from "next/link";
import { ATC, AgoTime } from "@/utils/functions";
import { Cell } from "react-table";

const NotesTable = ({ tableData, handlePaginationChange }: any) => {
  const { notes } = tableData;
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Last Updated At",
        Cell: (cellValue: Cell) => (
          <span className="">{AgoTime(ATC(cellValue).updatedAt)}</span>
        ),
      },
      {
        Header: "Created at",
        Cell: (cellValue: Cell) => (
          <span className="">{AgoTime(ATC(cellValue).createdAt)}</span>
        ),
      },
      {
        Header: "Action",
        Cell: (cellValue: Cell) => (
          <div className="flex">
            <Link href={`/dashboard/notes/${ATC(cellValue).id}`}>
              <button
                type="button"
                className="px-3 py-2 text-xs font-medium text-center text-white bg-gradient-to-br from-red-500 to-orange-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-orange-400 dark:focus:ring-blue-800 flex"
              >
                <FaInfoCircle className="mr-1" />
                Details
              </button>
            </Link>
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
