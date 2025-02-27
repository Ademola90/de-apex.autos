import { MenuItem } from "@headlessui/react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import React, { useState } from "react";

const ActionMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 rounded-lg bg-white shadow-lg border">
            <div className="py-1">
              <MenuItem icon={<Edit />} text="Edit" onClick={onEdit} />
              <MenuItem
                icon={<Trash />}
                text="Delete"
                onClick={onDelete}
                danger
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionMenu;
