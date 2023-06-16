import { useState } from "react";

const Modal = ({ title, heading, body }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  return (
    <div>
      <button onClick={toggleModal} className="btn-primary">
        {title}
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
          <div className="fixed inset-0 bg-black opacity-50"></div>{" "}
          <div className="relative bg-white p-6 rounded shadow-lg w-1/2">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">{heading}</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 cursor-pointer"
                onClick={toggleModal}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="max-h-80 overflow-y-auto">{body}</div>
            {/* <button
              onClick={toggleModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
