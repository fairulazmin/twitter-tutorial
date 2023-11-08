"use client";

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

export const Header = ({ label, showBackArrow }: HeaderProps) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <Undo2
            size={20}
            onClick={handleBack}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};
