"use client";

import { Home, Bell, User, LogOut } from "lucide-react";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarItem } from "./sidebar-item";
import { SidebarTweetButton } from "./sidebar-tweet-button";
import { signOut } from "next-auth/react";

export const Sidebar = () => {
  const items = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
    {
      label: "Profile",
      href: "/users/123",
      icon: User,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
          <SidebarItem icon={LogOut} label="Logout" onClick={() => signOut()} />
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};
