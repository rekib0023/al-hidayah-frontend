import { useRouter } from "next/router";
import { useState } from "react";

const DropdownButton = ({ initials, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (item.link) {
      router.push(item.link);
    } else if (item.callback) {
      item.callback();
    }
  };

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white"
        onClick={toggleDropdown}
      >
        <span className="font-bold uppercase">{initials}</span>
      </button>
      {isOpen && (
        <ul className="absolute right-0 w-48 mt-2 py-2 bg-white border border-gray-200 rounded shadow">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="pl-3 pr-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <div className="inline-flex gap-2 items-center">
                {item.logo} {item.label}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;
