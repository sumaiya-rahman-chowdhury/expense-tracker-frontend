"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User, LogOut, BarChart } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/add-expense", label: "Add Expenses", icon: <Home size={20} /> },
    { href: "/list-view", label: "Expense List View", icon: <User size={20} /> },
    { href: "/reports", label: "Expenses By Category", icon: <BarChart size={20} /> },
    { href: "/logout", label: "Logout", icon: <LogOut size={20} />, danger: true },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 rounded-md bg-gray-800 p-2 text-white md:hidden"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-lg transition-transform md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-center border-b">
          <h1 className="text-xl font-bold text-gray-800">Expense Tracker</h1>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {links.map(({ href, label, icon, danger }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : danger
                      ? "text-red-600 hover:bg-red-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {icon} {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay when sidebar open on mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}
    </>
  );
}
