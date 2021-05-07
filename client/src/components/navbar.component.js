import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdjust,
  faSignOutAlt,
  faUser,
  faListUl,
  faSignInAlt,
  faUsers,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons/";

const Navbar = ({ userData }) => {
  const { authenticated, isLoading } = userData;
  const theme = localStorage.getItem("__theme");
  const [value_a, setValue_a] = useState([]);
  const [value_b, setValue_b] = useState([]);
  const [value_c, setValue_c] = useState();

  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark");
    if (!isLoading && authenticated) {
      setValue_a([
        "Dashboard",
        "/",
        <FontAwesomeIcon icon={faListUl} style={{ fontSize: "1.5em" }} />,
      ]);
      setValue_b([
        "Sign Out",
        "/logout",
        <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: "1.5em" }} />,
      ]);
      setValue_c([
        "Account Settings",
        "/account",
        <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.4em" }} />,
      ]);
    } else {
      setValue_a([
        "Login",
        "/login",
        <FontAwesomeIcon icon={faSignInAlt} style={{ fontSize: "1.5em" }} />,
      ]);
      setValue_b([
        "Get Started",
        "/get-started",
        <FontAwesomeIcon icon={faUsers} style={{ fontSize: "1.5em" }} />,
      ]);
    }
  }, [userData, theme]);

  const toggleNavbar = (e) => {
    e.preventDefault();
    var menu = document.getElementById("navbar__menu");
    var icon = document.getElementById("navbar-icon");
    icon.classList.toggle("closeIcon");
    if (menu.style.display === "block") menu.style.display = "none";
    else menu.style.display = "block";
  };

  const changeMode = (e) => {
    e.preventDefault();
    let theme = "light";
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) theme = "dark";
    localStorage.setItem("__theme", theme);
  };

  return (
    <div>
      <div className="navbar">
        <a className="navbar__logo" href={authenticated ? "/" : "/welcome"}>
          TodoApp
        </a>
        <div className="navbar__menu" id="navbar__menu">
          <a
            className="animation__underline"
            href="https://todoapp.freshstatus.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icons">
              <Tooltip title="Status">
                <span>
                  <FontAwesomeIcon
                    icon={faChartLine}
                    style={{ fontSize: "1.5em" }}
                  />
                </span>
              </Tooltip>
            </span>
            <span className="description">Status</span>
          </a>
          <a className="animation__underline" href={value_a[1]}>
            <span className="icons">
              <Tooltip title={value_a[0] ? value_a[0] : ""}>
                <span>{value_a[2]}</span>
              </Tooltip>
            </span>
            <span className="description">{value_a[0]}</span>
          </a>
          {value_c ? (
            <a
              className="animation__underline"
              id={value_c[0]}
              href={value_c[1]}
            >
              <span className="icons">
                <Tooltip title={value_c[0] ? value_c[0] : ""}>
                  <span>{value_c[2]}</span>
                </Tooltip>
              </span>
              <span className="description">{value_c[0]}</span>
            </a>
          ) : null}
          <a
            className="animation__underline"
            id={value_b[0]}
            href={value_b[1]}
            onClick={value_b[3]}
          >
            <span className="icons">
              <Tooltip title={value_b[0] ? value_b[0] : ""}>
                <span>{value_b[2]}</span>
              </Tooltip>
            </span>
            <span className="description">{value_b[0]}</span>
          </a>
        </div>
        <div className="toggleNavbar">
          <Tooltip title="Menu">
            <IconButton onClick={toggleNavbar}>
              <div className="container-bar" id="navbar-icon">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Tooltip title="Change Mode">
        <button
          className="btn__changeMode"
          aria-label="Change Mode"
          onClick={changeMode}
        >
          <FontAwesomeIcon icon={faAdjust} size="2x" />
        </button>
      </Tooltip>
    </div>
  );
};

export default Navbar;
