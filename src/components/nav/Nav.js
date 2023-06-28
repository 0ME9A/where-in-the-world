import { Link, Outlet } from "react-router-dom";
import { RiMoonLine } from "react-icons/ri";
import { IoMdMoon } from "react-icons/io";
import { useState } from "react";
import "./Nav.sass";

const Nav = () => {
  let [moon, setMoon] = useState(1);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const setTheme = () => {
    if (document.cookie.includes("dark")) {
      document.cookie =
        "dark=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setMoon(0);
      setCurrentTheme('dark')
    } else {
      document.cookie = "dark=true;path=/";
      setMoon(1);
      setCurrentTheme('light')
    }
  };
  return (
    <>
      <header id="navigation">
        <nav className="nav-content">
          <Link to="/" title="Where in the world?">
            <h2>Where in the world?</h2>
          </Link>
          <button aria-label={"Theme switch " + currentTheme} onClick={setTheme}>
            {moon === 1 ? (
              <RiMoonLine className="moon" />
            ) : (
              <IoMdMoon className="moon" />
            )}{""}
            Dark Mode
          </button>
        </nav>
      </header>
      <hr />
      <Outlet />
    </>
  );
};

export default Nav;
