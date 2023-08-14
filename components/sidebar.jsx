"use client";
import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const routes = [
    { icon: Home, href: "/", label: "Home" },
    { icon: Plus, href: "/character/new", label: "Create" },
    { icon: Settings, href: "/settings", label: "Settings" },
  ];

  const onNavigate = (url, pro) => {
    return router.push(url);
  };

  // return (
  //   <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white py-4 dark:border-slate-700 dark:bg-slate-900">
  //     <div className="mb-10 flex items-center rounded-lg  text-slate-900 dark:text-white">
  //       <div className="space-y-2">
  //         {routes.map((route) => (
  //           <div
  //             onClick={() => onNavigate(route.href, route.pro)}
  //             key={route.href}
  //             className={cn(
  //               "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700 font-medium cursor-pointer",
  //               pathName === route.href && "bg-primary/10 text-primary"
  //             )}
  //           >
  //             <div className="flex flex-col gap-y-2 items-center flex-1">
  //               <route.icon className="h-5 w-5" />
  //               {route.label}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
      <ul className="mt-16 space-y-4 text-sm font-medium">
      {routes.map((route) => (
        <li key={route.href}>
          <a href={route.href} className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
            <route.icon className="h-5 w-5 text-xl" />
            <span className="ml-3 flex-1 whitespace-nowrap">{route.label}</span>
          </a>
        </li>
      ))}
      </ul>
      <div className="mt-auto flex">

      </div>
    </div>
  )


};

export default Sidebar;
