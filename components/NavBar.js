import Link from "next/link";

export default function NavBar() {
  return (
    <div className="container-div mt-2 flex justify-between items-center">
      <Link href="/">
        <div className="flex flex-col">
          <h2 className="text-xl">Al Hidayah</h2>
          <div className="text-sm">International Public School</div>
        </div>
      </Link>
      <nav>
        <ul className="flex gap-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Academics</Link>
          </li>
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
          <li>
            <Link href="/login?type=management">Management Login</Link>
          </li>
          <li>
            <Link href="/login?type=staff">Staff Login</Link>
          </li>
          <li>
            <Link href="/login?type=student">Student Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
