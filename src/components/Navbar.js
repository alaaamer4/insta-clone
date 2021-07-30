import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
const Navbar = () => {
  const [user, setUser] = useState(null);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  const handleClick = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };
  return user ? (
    <nav className="navbar navbar-white navbar-light bg-white navbar-expand">
      <div className="wrapper-nav">
        <Link
          to="/"
          className="navbar-brand"
          style={{ width: "100px", objectFit: "cover" }}
        >
          <img
            src={require("../img/1280px-Instagram_logo.svg.png")}
            alt=""
            style={{ width: "100%" }}
            loading="lazy"
          />
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item text-secondary ">
            <Link className="nav-link" to="/upload">
              <h4 data-tooltip="Add Post">
                {" "}
                <FcAddImage />{" "}
              </h4>
            </Link>
          </li>
          <li className="nav-item text-secondary ">
            <Link className="nav-link" to="/" onClick={handleClick}>
              <h4 data-tooltip="Sign Out">
                {" "}
                <GoSignOut />
              </h4>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  ) : (
    <nav className="navbar navbar-white navbar-light bg-white navbar-expand">
      <div className="wrapper-nav">
        <Link
          to="/"
          className="navbar-brand"
          style={{ width: "100px", objectFit: "cover" }}
        >
          <img
            src={require("../img/1280px-Instagram_logo.svg.png")}
            alt=""
            style={{ width: "100%", zIndex: 10000 }}
            loading="lazy"
          />
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item text-secondary ">
            <Link className="nav-link" to="/register">
              <h4 data-tooltip="Register">
                <AiOutlineUsergroupAdd />
              </h4>
            </Link>
          </li>
          <li className="nav-item text-secondary ">
            <Link className="nav-link" to="/login">
              <h4 data-tooltip="Sign in">
                <GoSignIn />
              </h4>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
