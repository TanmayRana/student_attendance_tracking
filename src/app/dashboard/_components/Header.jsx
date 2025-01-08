"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  const { user } = useKindeBrowserClient();

  return (
    <div className="p-4 shadow-sm border flex justify-between">
      <div className=""></div>
      <div className="flex items-center gap-4">
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
        <div className="">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
