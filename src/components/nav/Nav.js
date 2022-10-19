import "./Nav.sass";
import { IoMdMoon } from "react-icons/io";
import { RiMoonLine } from "react-icons/ri";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Nav = () => {
  let [moon, setMoon] = useState(1);
  const setTheme = () => {
    if (document.cookie.includes("dark")) {
      document.cookie =
        "dark=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setMoon(0);
    } else {
      document.cookie = "dark=true;path=/";
      setMoon(1);
    }
  };
  return (
    <>
      <nav>
        <div className="nav-content">
          <Link to="/" target={"_top"}>
            <h1>Where in the world?</h1>
          </Link>
          <button onClick={setTheme}>
            {moon === 1 ? (
              <RiMoonLine className="moon" />
            ) : (
              <IoMdMoon className="moon" />
            )}{" "}
            Dark Mode
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
