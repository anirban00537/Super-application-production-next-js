"use client";
import React, { useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import Pagination from "../Paginate/index.comp";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { DataTableProps } from "@/types";

const DataTable = ({
  columns,
  data,
  dataWithPagination,
  handlePaginationChange,
  search = true,
}: DataTableProps) => {
  // Create an instance of the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    //@ts-ignore
    setGlobalFilter,
  } = useTable(
    {
      //@ts-ignore
      columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter }: any = state;

  return (
    <div className="mt-10">
      {search && (
        <div className="w-full flex items-center justify-between mb-5">
          <div>
            <p className="mr-3 text-gray-700">Search:</p>
            <input
              type="text"
              className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
      )}

      <table className="w-full divide-y divide-gray-200" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  <span className="flex">
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FiChevronDown className="" />
                      ) : (
                        <FiChevronUp className="" />
                      )
                    ) : (
                      <FiChevronUp className="opacity-0 " />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody
          className="bg-white divide-y divide-gray-200"
          {...getTableBodyProps()}
        >
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-700"
              >
                No data available
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {cell.render("Cell")}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <Pagination
        data={dataWithPagination}
        handlePaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default DataTable;
