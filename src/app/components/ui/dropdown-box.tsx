"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface DropdownBoxProps {
  subtitle: string;
  children: React.ReactNode;
  openOnInit?: boolean;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({
  subtitle,
  children,
  openOnInit,
}) => {
  const [isOpen, setIsOpen] = useState(!!openOnInit);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={toggleDropdown}
        >
          <h3 className="text-lg font-semibold text-gray-700">{subtitle}</h3>
          <div
            className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </div>
        </div>
        {isOpen && (
          <div className="p-4 border-t border-gray-200 select-none">
            {/* game content unselectable */}
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownBox;
