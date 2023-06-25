"use client"
import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";

const NotesTable = () => {
  const [sortOption, setSortOption] = useState("default");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    // Handle sorting logic based on the selected option
    // You can implement the sorting functionality here
  };

  return (
    <div className="mt-10">
      <div className="w-full flex items-center justify-between mb-5">
        <div>
          <p className="mr-3 text-gray-700">Search:</p>
          <input
            type="text"
            className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="ml-4">
          <label htmlFor="sort" className="text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            className="block w-48 py-2 pl-3 pr-8 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="title">Title</option>
            <option value="createdAt">Created At</option>
          </select>
        </div>
      </div>
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Created at
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900">This is a note title</div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900">Description</div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900">Tomorrow</div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900">
                <span className="flex">
                  Details
                  <FiInfo className="ml-2" />
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NotesTable;
