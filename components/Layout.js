import NavBar from "./NavBar";
import TopBar from "./TopBar";

export default function Layout({ children }) {
  return (
    <div>
      <TopBar />
      <NavBar />
      {children}
    </div>
  );
}
