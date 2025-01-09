import React from "react";
import { Link } from "react-router-dom";
import swiftRideLogo from "../assets/swiftRideLogo.png";
const Header = () => {
  return (
    <div className="z-10 absolute top-0  pl-4 pt-7 pb-4">
      <Link to="/">
        <img
          className="w-24 rounded"
          // style={{ filter: "invert(1)" }}
          src={swiftRideLogo}
        />
      </Link>
    </div>
  );
};

export default Header;
