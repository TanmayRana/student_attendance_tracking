"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },

    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const { user } = useKindeBrowserClient();
  const path = usePathname();

  return (
    <div className="border shadow-md h-screen p-5">
      <Image src={"/logo.svg"} alt="logo" width={100} height={50} />

      <hr className="my-5" />

      {menuList.map((item, index) => (
        <Link href={item.path} key={index}>
          <h2
            className={`flex items-center gap-3 text-lg p-4 cursor-pointer hover:rounded-lg text-slate-500 hover:bg-primary hover:text-white my-2 rounded-md ${
              path === item.path && "bg-primary text-white"
            }`}
          >
            <item.icon />
            {item.name}
          </h2>
        </Link>
      ))}

      <div className="flex gap-2 items-center fixed bottom-5 p-2">
        <Avatar>
          <AvatarImage
            src={user?.picture}
            alt={user?.given_name || "User Avatar"}
          />

          <AvatarFallback>
            {`${user?.given_name?.[0]?.toUpperCase()}${user?.family_name?.[0]?.toUpperCase()} ` ||
              "?"}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-sm font-bold">{user?.given_name || "Guest"}</h2>
          <h2 className="text-xs text-slate-400">
            {user?.email || "No email provided"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
