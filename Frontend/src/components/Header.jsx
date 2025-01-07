import React from "react";
import swiftRideLogo from "../assets/swiftRideLogo.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="z-50 fixed top-0 bg-[#191919] w-full pl-4 pt-7 pb-4">
      <Link to="/">
        <img className="w-24  rounded" src={swiftRideLogo} />
      </Link>
    </div>
  );
};

export default Header;
