import { XIcon } from "lucide-react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  categories: { id: string; name: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, categories }) => {
  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-300"
      enterFrom="transform -translate-x-full"
      enterTo="transform translate-x-0"
      leave="transition ease-in duration-300"
      leaveFrom="transform translate-x-0"
      leaveTo="transform -translate-x-full"
    >
      <div className="fixed inset-0 z-50 flex">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
        <div className="relative flex flex-col w-64 bg-white shadow-lg h-screen z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Categories</h2>
            <button
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              onClick={toggleSidebar}
            >
              <XIcon size={24} />
            </button>
          </div>
          <div className="flex-1 pt-2 pb-4 overflow-y-auto">
            <nav className="mt-2 px-2 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/collections/${category.name.replace(/\s+/g, "-")}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Sidebar;
