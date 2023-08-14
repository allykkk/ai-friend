"use client";

import { Home, Plus, Info } from "lucide-react";

const Sidebar = () => {
  const routes = [
    { icon: Home, href: "/", label: "Home" },
    { icon: Plus, href: "/character/new", label: "Create" },
    { icon: Info, href: "/about", label: "About" },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
      <ul className="mt-16 space-y-4 text-sm font-medium">
        {routes.map((route) => (
          <li key={route.href}>
            <a
              href={route.href}
              className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
            >
              <route.icon className="h-5 w-5 text-xl" />
              <span className="ml-3 flex-1 whitespace-nowrap">
                {route.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex"></div>
    </div>
  );
};

export default Sidebar;
