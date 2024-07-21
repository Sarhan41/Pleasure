import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import FirstRowUser from "./FirstRowUser";
import SecondRowCategory from "./SecondRowCategory";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  categories: {
    id: string;
    name: string;
    products: { id: string; name: string }[];
  }[];
  userId: string | null | undefined;
  userName: string | null | undefined;
}

const getFormattedProductName = (productName: string, categoryName: string) => {
  const words = productName.split(" ").slice(0, 3).join(" ");
  return `${words} ${categoryName}`;
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  categories,
  userId,
  userName,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup to ensure overflow is reset
    };
  }, [isOpen]);

  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };

  return (
    <Transition
      appear={true}

      show={isOpen}
      className={`fixed inset-0 z-50 flex`}
      enter="transition ease-out duration-300"
      enterFrom="transform -translate-x-full "
      enterTo="transform translate-x-0"
      leave="transition ease-in duration-300"
      leaveFrom="transform translate-x-0"
      leaveTo="transform -translate-x-full"
    >
      <div className="fixed inset-0 z-50 flex">
        <div className="relative flex flex-col w-64 bg-white shadow-xl h-screen z-50 overflow-y-auto">
          {/* First row user div  */}
          <div>
            <FirstRowUser
              userName={userName}
              toggleSidebar={toggleSidebar}
              userId={userId}
            />
          </div>
          {/* category div */}
          <div className="flex flex-col h-full ">
            <SecondRowCategory
              handleCategoryClick={handleCategoryClick}
              expandedCategory={expandedCategory}
              getFormattedProductName={getFormattedProductName}
              toggleSidebar={toggleSidebar}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Sidebar;
