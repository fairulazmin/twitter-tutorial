import { Twitter } from "lucide-react";
import Link from "next/link";

export const SidebarLogo = () => {
  return (
    <Link href="/">
      <div className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition">
        <Twitter size={28} fill="currentColor" />
      </div>
    </Link>
  );
};
