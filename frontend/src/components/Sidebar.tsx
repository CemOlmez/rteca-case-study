"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      {/* App title */}
      <div className="p-4 text-lg font-semibold flex items-center gap-2">
        <i className="fa-solid fa-building"></i>
        JokerSoft CRM
      </div>

      <hr className="border-slate-700" />

      {/* Menu */}
      <nav className="flex-1 p-2">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-700 rounded"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <i className="fa-solid fa-network-wired"></i>
            Franchise Management
          </span>
          <i
            className={`fa-solid fa-chevron-down transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="mt-2 ml-4 flex flex-col gap-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-700 rounded"
            >
              <i className="fa-solid fa-house"></i>
              Dashboard
            </Link>

            <Link
              href="/franchises"
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-700 rounded"
            >
              <i className="fa-solid fa-circle-info"></i>
              Franchise Info
            </Link>

            <Link
              href="/offices"
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-700 rounded"
            >
              <i className="fa-solid fa-building"></i>
              Offices
            </Link>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-700 flex items-center gap-2 text-sm">
        <i className="fa-solid fa-circle-user"></i>
        Admin User
      </div>
    </aside>
  );
}
