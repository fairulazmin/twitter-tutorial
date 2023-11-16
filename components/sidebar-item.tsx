import { useSession } from "next-auth/react";
import { useCallback } from "react";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: React.ElementType;
  onClick?: () => void;
}

export const SidebarItem = ({
  label,
  href,
  icon: Icon,
  onClick,
}: SidebarItemProps) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
  }, [onClick]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden cursor-pointer">
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 items-center">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-xl">{label}</p>
      </div>
    </div>
  );
};
