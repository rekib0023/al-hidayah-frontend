import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import DropdownButton from "./DropdownButton";

export default function NavBar() {
  const { user, logout } = useAuth();

  const profileItems = [
    {
      id: 1,
      label: "Profile",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
      link: "/profile",
    },
    {
      id: 2,
      label: "Logout",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      ),
      callback: logout,
    },
  ];

  return (
    <div className="container-div mt-2 flex justify-between items-center">
      <Link href="/">
        <div className="flex flex-col">
          <h2 className="text-xl">Al Hidayah</h2>
          <div className="text-sm">International Public School</div>
        </div>
      </Link>
      <nav>
        <ul className="flex gap-8 items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          {/* <li>
            <Link href="/">Academics</Link>
          </li> */}
          <div className="dropdown">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="px-4 text-center inline-flex items-center"
              type="button"
            >
              Academics
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              id="dropdown"
              className="hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Earnings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <li>
            <Link href="/">Admission</Link>
          </li>
          <li>
            <Link href="/">Store</Link>
          </li>
          <li>
            <Link href="/">School Life</Link>
          </li>
          <li>
            <Link href="/">News/Events</Link>
          </li>
          <li>
            <Link href="/">About Us</Link>
          </li>
          {user ? (
            <DropdownButton initials={user.name[0]} menuItems={profileItems} />
          ) : (
            <>
              <li>
                <Link href="/login?type=management">Management Login</Link>
              </li>
              <li>
                <Link href="/login?type=staff">Staff Login</Link>
              </li>
              <li>
                <Link href="/login?type=student">Student Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
