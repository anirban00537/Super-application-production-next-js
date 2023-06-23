"use client";

import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { MdEmojiEvents } from "react-icons/md";
import { HiTemplate } from "react-icons/hi";
import { RiProfileFill } from "react-icons/ri";
export default function DashboardSidebar() {
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-20 overflow-y-auto bg-white dark:bg-gray-800 border-r ">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BiSolidDashboard size={25} />
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/portfolios"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MdEmojiEvents size={25} />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Portfolios
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/templates"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <HiTemplate size={25} />
                <span className="flex-1 ml-3 whitespace-nowrap">Templates</span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RiProfileFill size={25} />
                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}