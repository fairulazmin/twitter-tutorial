import Link from "next/link";
import { Feather } from "lucide-react";

export const SidebarTweetButton = () => {
  return (
    <Link href="/">
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <Feather />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition">
        <p className="hidden lg:block text-center font-semibold text-[20px]">
          Tweet
        </p>
      </div>
    </Link>
  );
};
